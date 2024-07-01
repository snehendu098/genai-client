import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "ESG Gen",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: { label: "Password", type: "text" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $and: [{ email: credentials.identifier.email }],
          });

          if (!user) {
            throw new Error("No User Found with this email");
          }

          if (!user.isVerified) {
            throw new Error(
              "Please Verify Your Account first before login. To get a new token head over to registration and put up your credentials",
            );
          }

          const isPassCorrect = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          if (isPassCorrect) {
            return user;
          } else {
            throw new Error("Incorrect Password");
          }
        } catch (err) {
          console.log(err);
          throw new Error("Error occurred");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.email = token.email;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.email = user.email;
      }

      return token;
    },
  },
};
