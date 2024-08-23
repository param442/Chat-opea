import crypto from "crypto";
import { db } from "@repo/database/db";

// Function to create a random verification token
const generateVerificationToken = async ({
  length = 32,
  Email,
}: {
  length?: number;
  Email: string;
}) => {
  try {
    const existingToken = await db.verificationToken.findFirst({
      where: {
        Email: Email,
      },
    });

    // If a token exists, delete it by id
    if (existingToken) {
      await db.verificationToken.delete({
        where: {
          id: existingToken.id, // Delete by the unique ID
        },
      });
    }

    // Generate random bytes and convert them to a hexadecimal string
    const token = crypto.randomBytes(length).toString("hex");

    // Set token expiration time (5 minutes from now)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    // Store the token in the database
    await db.verificationToken.create({
      data: {
        token,
        Email: Email,
        createdAt: new Date(),
        expires: expiresAt,
      },
    });

    return { token, success: true };
  } catch (error: any) {
    console.error("Error generating verification token:", error);
    return { error: error, success: false };
  }
};

export default generateVerificationToken;
