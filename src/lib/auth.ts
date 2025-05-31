// Read more here: https://better-auth.vercel.app/docs/integrations/next

import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

export const auth = betterAuth({
  // https://better-auth.vercel.app/docs/authentication/twitter
  socialProviders: {
    twitter: {
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()], // make sure this is the last plugin in the array
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
});
