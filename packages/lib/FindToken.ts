"use server";

import { db } from "@repo/database/db";

export const FindVerficationToken = async (token: string) => {
  try {
    const Token = await db.verificationToken.findFirst({
      where: {
        token,
      },
    });
    console.log(Token);

    return Token;
  } catch (error) {
    return null;
  }
};
