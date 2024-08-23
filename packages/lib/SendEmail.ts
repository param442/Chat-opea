import nodemailer from "nodemailer";

// Utility function to create the email transport
const createTransport = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_APP_PASS,
    },
  });
};

export const SendVerificationEmail = async (
  email: string,
  token: string,
  oldEmail?: string
) => {
  const confirmationLink = oldEmail
    ? `${process.env.URL}/auth/new-verification?token=${token}&email=${oldEmail}`
    : `${process.env.URL}/auth/new-verification?token=${token}`;

  const transport = createTransport();
  console.log(process.env.GMAIL_APP_PASS);
  const mailOptions = {
    from: process.env.GMAIL,
    to: email,
    subject: "Email Verification",
    html: `
      <p>Thank you for registering with Chatopea. Please click the link below to verify your email:</p>
      <a href="${confirmationLink}">Verify Email</a>
      <p>If you did not register for this account, please ignore this email.</p>
    `,
  };

  try {
    await transport.sendMail(mailOptions);
    console.log("Verification email sent successfully.");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};
