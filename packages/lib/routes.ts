/**
 * These routes are accessible by everyone, meaning no authentication required.
 * @type {string[]}
 */
export const publicRoutes = ["/auth/new-verification"];

/**
 * These routes are accessible by unauthorized users, used for login and signup.
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/register",
  "auth/error",
  "/api/auth/providers",
  "/auth/reset",
  "/auth/reset-password",
];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used by the API.
 * @type {string}
 */
export const apiAuthPrefix = "/auth/api";

/**
 * The prefix that decides the default route after logging in.
 * @type {string}
 */
export const defaultLoggedPrefix = "/";
