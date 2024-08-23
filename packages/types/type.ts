import email from "next-auth/providers/email";
import z from "zod";

interface Message {
  message: string;
  id: string;
  type: TypeClient;
}

interface MessageType {
  [userId: string]: Message;
}
type oAuthTypes = "google" | "github";
interface UserType {
  id: string;
  name: string;
  email: string;
  Image: string;
}

type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

type UserStatus = "USER" | "FOLLOWER";
enum TypeClient {
  USER,
  CLIENT,
}

type TypeNoitications =
  | {
      followerName: string;
      followerImage?: string | null;
      followerId: string;
      type: string;
      content?: string | null;
    }[]
  | { Notifications: null; message?: string; error?: string };

interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
}
interface NavbarProps {
  img: string;
  name: string;
  type: UserStatus;
  className?: string;
  onclick?: {
    notification?: () => void;
    favorite?: () => void;
    videoCall?: () => void;
    voiceCall?: () => void;
    more?: () => void;
    Follow?: () => void;
    User?: () => void;
  };
}

interface statusCardProps {
  name: string;
  img?: string;
  day?: string;
  Status?: "online" | "offline";
  onClick?: () => void;
}

const mssg = (message: string) => message || "This field is required";

const LoginSchema = z.object({
  email: z.string().email(mssg("Email is required")),
  password: z
    .string()
    .min(6, mssg("Password must be at least 6 characters long")),
});
const SignupSchema = z.object({
  name: z
    .string()
    .min(3, mssg("username is too short"))
    .max(15, mssg("Username can only be 15 characters long")),
  email: z.string().email(mssg("Email is required")),
  password: z
    .string()
    .min(6, mssg("Password must be at least 6 characters long")),
});

type TypeLoginSchema = z.infer<typeof LoginSchema>;
type TypeSignupSchema = z.infer<typeof SignupSchema>;
// Define the structure of a "register" message
type RegisterMessage = {
  type: "register";
  to: string;
  from: string;
};

// Define the structure of a "message" message
type ChatMessage = {
  type: "message";
  from: string;
  to: string;
  content: string;
};
export type {
  MessageType,
  UserStatus,
  UserType,
  NavbarProps,
  statusCardProps,
  TypeLoginSchema,
  TypeSignupSchema,
  User,
  oAuthTypes,
  TypeNoitications,
  RegisterMessage,
  ChatMessage,
  Message,
};
export { TypeClient, LoginSchema, SignupSchema };
