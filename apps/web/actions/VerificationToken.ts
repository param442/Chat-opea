'use server';

import { db } from '@repo/database/db';
import { FindVerficationToken } from '@repo/lib/FindToken';
import { getUserbyEmail } from '@repo/lib/GetUser';
const VerificationToken = async (token: string, OldEmail?: string) => {
  const Token = await FindVerficationToken(token);

  if (!Token) {
    return { error: 'Token do not exist' };
  }
  const hasExpired = new Date(Token.expires) < new Date();
  if (hasExpired) {
    return { error: 'Token has expired' };
  }
  const existingUser = OldEmail
    ? await getUserbyEmail(OldEmail)
    : await getUserbyEmail(Token.Email);
  if (!existingUser) {
    return { error: 'user does not exist' };
  }
  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: Token.Email,
    },
  });
  await db.verificationToken.delete({
    where: { id: Token.id },
  });
  return { success: 'email verified' };
};

export default VerificationToken;
