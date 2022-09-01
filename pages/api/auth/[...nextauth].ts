import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@lib/prisma";

// Enable studio auth in development mode
const cookiesPolicy =
  process.env.NODE_ENV === "development"
    ? {
        sessionToken: {
          name: `_Secure_next-auth.session-token`,
          options: {
            httpOnly: true,
            sameSite: "None",
            path: "/",
            secure: true,
          },
        },
      }
    : {};

const options = {
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.PROVIDER_SMTP_HOST,
        port: Number(process.env.PROVIDER_SMTP_PORT),
        auth: {
          user: process.env.PROVIDER_SMTP_USER,
          pass: process.env.PROVIDER_SMTP_PASSWORD,
        },
      },
      from: process.env.PROVIDER_SMTP_FROM,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  cookies: cookiesPolicy,
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;
