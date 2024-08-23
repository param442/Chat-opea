'use server';

import { db } from '@repo/database/db';
import { TypeLoginSchema, LoginSchema } from '@repo/types/types';
import bcrypt from 'bcryptjs';
import generateVerificationToken from '@repo/lib/VerficationToken';
import { SendVerificationEmail } from '@repo/lib/SendEmail';

import { AuthError } from 'next-auth';
import { defaultLoggedPrefix } from '@repo/lib/routes';
import { signIn } from '../auth';

const LoginCheck = async (values: TypeLoginSchema) => {
  const data = LoginSchema.safeParse(values);
  if (!data.success) {
    throw new Error('Invalid input values');
  }
  const { email, password } = data.data;

  // Check if user exists
  const user = await db.user.findFirst({
    where: { email: email },
  });
  if (!user) {
    throw new Error('User not found');
  }

  // Check if user has a password
  if (!user.passwordHash) {
    return { error: 'User does not have a password set' };
  }

  // Validate password
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return { error: 'Invalid password' };
  }

  // Check if email is verified
  if (!user.emailVerified) {
    const tokenResult = await generateVerificationToken({
      Email: user.email,
    });

    if (!tokenResult.success || !tokenResult.token) {
      throw new Error('Failed to generate verification token');
    }

    // Send verification email
    await SendVerificationEmail(user.email, tokenResult.token);
    return {
      error:
        'Please verify your email. A verification link has been sent to your email.',
    };
  }
  try {
    // Validate input values

    // Sign in the user
    await signIn('credentials', {
      email,
      password,
      redirectTo: defaultLoggedPrefix,
    });

    return { success: 'You are logged in successfully' };
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' };
        default:
          return { error: 'Something went wrong' };
      }
    }
    throw error;
  }
};

export default LoginCheck;
