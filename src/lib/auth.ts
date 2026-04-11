import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { upsertProfileFromOAuth } from "@/lib/supabase/profiles";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider && account.providerAccountId) {
        try {
          await upsertProfileFromOAuth(user, {
            provider: account.provider,
            providerAccountId: account.providerAccountId,
          });
        } catch (e) {
          console.error("[auth] Falha ao sincronizar perfil com o Supabase:", e);
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        if (account?.provider) {
          token.provider = account.provider;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        if (token.provider) {
          session.user.provider = token.provider;
        }
      }
      return session;
    },
  },
};
