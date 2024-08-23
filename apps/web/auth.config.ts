import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitProvider from 'next-auth/providers/github';
import type { User } from 'next-auth';
import { LoginSchema } from '@repo/types/types';
import { getUserbyEmail } from '@repo/lib/GetUser';
import bcrypt from 'bcryptjs';

const credentialsProvider = CredentialsProvider({
  credentials: {
    username: { label: 'Username', type: 'text' },
    password: { label: 'Password', type: 'password' },
  },

  async authorize(credentials) {
    try {
      const ValidateSchema = LoginSchema.safeParse(credentials);
      if (ValidateSchema.success) {
        const { email, password } = ValidateSchema.data;
        const User = await getUserbyEmail(email);
        if (!User || !User.passwordHash) {
          return null;
        }
        const Compare = await bcrypt.compare(password, User.passwordHash);
        if (Compare) {
          return {
            ...User,
          };
        }
      }

      return null;
    } catch (error) {
      console.error('Authorization error:', error);
      return null;
    }
  },
});
const Google = GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  authorization: {
    params: {
      prompt: 'consent',
      access_type: 'offline',
      respose_type: 'code',
    },
  },
});
const GitHub = GitProvider({
  clientId: process.env.GIT_CLIENT_ID,
  clientSecret: process.env.GIT_CLIENT_SECRET,
  authorization: {
    params: {
      prompt: 'consent',
      access_type: 'offline',
      respose_type: 'code',
    },
  },
});
const nextAuthConfig: NextAuthConfig = {
  providers: [credentialsProvider, Google, GitHub],
};

export default nextAuthConfig;
