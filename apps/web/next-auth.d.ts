// next-auth.d.ts

import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

// Define a common type for follower and following relationships
type UserRelation = {
  id: string;
  followerId: string;
  followingId: string;
};

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      emailVerified: Date | null;
      name: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    email: string;
    emailVerified: Date | null;
    name: string;
  }
}
