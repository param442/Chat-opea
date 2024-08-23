import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@repo/database/db';
import {
  getUserbyId,
  GetAccountByUserID,
  getUserbyIdWithFollowing_Followers,
} from '@repo/lib/GetUser';
import NextAuth from 'next-auth';
import authconfig from './auth.config';

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authconfig,
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user.id) return false;
      if (account?.provider !== 'credentials') {
        db.user.update({
          where: {
            id: user.id,
          },
          data: {
            emailVerified: new Date(),
          },
        });

        return true;
      }

      const existingUser = await getUserbyId(user.id);
      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const user = await getUserbyIdWithFollowing_Followers(token.sub);

      if (!user) return token;
      const Account = await GetAccountByUserID(user.id);
      token.id = user.id;
      token.email = user.email;
      token.name = user.name;
      token.image = user.image;
      return token;
    },
    async session({ session, token }) {
      // Attach the token info to the session
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          emailVerified: token.emailVerified as Date | null, // Attach emailVerified to session if needed
          // Add other fields as needed
          name: token.name as string,
          image: token.image as string | null,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/register',
  },
  // Optionally, you can configure other NextAuth options here
  secret: process.env.AUTH_SECRET,
});
