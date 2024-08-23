'use server';
import bcrypt from 'bcryptjs';
import { SignupSchema, TypeSignupSchema } from '@repo/types/types';
import { db } from '@repo/database/db';
import generateVerificationToken from '@repo/lib/VerficationToken';
import { SendVerificationEmail } from '@repo/lib/SendEmail';
import { getUserbyEmail } from '@repo/lib/GetUser';
import { error } from 'console';

export const register = async (values: TypeSignupSchema) => {
  try {
    // Validate values using Zod schema
    const parseValues = SignupSchema.safeParse(values);
    if (!parseValues.success) {
      throw new Error('Invalid input fields');
    }
    console.log(process.env.GMAIL);
    // Extract validated data
    const { name, email, password } = parseValues.data;
    const Isuser = await getUserbyEmail(email);
    if (Isuser) {
      return { error: true, message: 'User already exist ' };
    } // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const user = await db.user.create({
      data: {
        name: name,
        email: email,
        passwordHash: hashedPassword,
      },
    });

    // Generate a verification token
    const tokenResult = await generateVerificationToken({ Email: user.email });

    if (!tokenResult.success) {
      throw new Error('Failed to create verification token');
    }

    const { token } = tokenResult;

    if (!token) {
      throw new Error('Verification token is undefined');
    }

    // Send verification email
    await SendVerificationEmail(user.email, token);

    // Return success response
    return { success: true };
  } catch (error: any) {
    console.error('Registration error:', error); // Log the error for debugging
    return { error: error.message || 'An unexpected error occurred' };
  }
};
