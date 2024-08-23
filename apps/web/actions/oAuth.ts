import { oAuthTypes } from '@repo/types/types';
import { AuthError } from 'next-auth';
import { signIn } from 'next-auth/react';

export const oAuth = async (Provider: oAuthTypes) => {
  try {
    const signin = signIn(Provider, {
      redirectTo: '/',
    });
    return { success: 'Logged in' };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' };
        default:
          return { error: 'something went wrong' };
      }
    }
    throw error;
  }
};
