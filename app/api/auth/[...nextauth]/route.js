import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";
import pool from "@/lib/db";
import { NextResponse } from "next/server";

const handler = NextAuth({
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
        console.log("User ID from session:", session.user.id);
        console.log(session);
        const [isUserExist] = await pool.execute(
          "SELECT * FROM uzytkownicy WHERE email = ?",
          [session.user.email]
        );
        console.log(isUserExist);
        if (isUserExist.length > 0) {
          session.user.dbID = isUserExist[0].id;
          session.user.descriptionDB = isUserExist[0].opis;
        }
        if (isUserExist.length < 0) {
          console.log("uzytkownik nie istnieje wiec zakladam mu wiersz.");
          const [{ response }] = await pool.execute(
            "INSERT INTO uzytkownicy (firstName, email, profil_image) VALUES (?, ?, ?)",
            [session.user.name, session.user.email, session.user.image]
          );
        }
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/logowanie",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const [existingUsers] = await pool.execute(
          "SELECT * FROM uzytkownicy WHERE email = ?",
          [credentials?.email]
        );

        const user = existingUsers[0];

        const passwordCorrect = await compare(
          credentials?.password || "",
          user.password
        );

        console.log({ passwordCorrect });

        if (passwordCorrect) {
          console.log(user);

          return {
            id: user.id,
            name: user.firstName + " " + user.lastName,
            email: user.email,
          };
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
