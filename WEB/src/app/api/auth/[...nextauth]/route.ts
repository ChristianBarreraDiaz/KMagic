// next-auth
import { SessionStrategy } from "next-auth";
import NextAuth from "@/lib/next-auth";
import CredentialsProvider from "@/lib/next-auth/providers/credentials";

// other packages
import { PrismaAdapter } from "@/lib/prisma";
import prisma from "@/lib/prisma";
import bcrypt from "@/lib/bcrypt";

// utils
import { validateEmail } from "@/utils/emailValidator";

const sessionStrategy: SessionStrategy = "jwt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("🚀 ~ file: route.ts:26 ~ authorize ~ req:", req);
        console.log(
          "🚀 ~ file: route.ts:26 ~ authorize ~ credentials:",
          credentials,
        );

        if (!credentials?.username || !credentials?.password) {
          // Any object returned will be saved in `user` property of the JWT
          return null;
        }

        // const formattedRut = formatRut(credentials.username);
        // const rutIsValid = validateRut(formattedRut);
        const userNameIsValid = validateEmail(credentials.username);
        // console.log(
        //   "🚀 ~ file: route.ts:41 ~ authorize ~ rutIsValid:",
        //   rutIsValid,
        // );

        if (!userNameIsValid) return null;

        try {
          const userAtuh = await prisma.usuario.findUnique({
            where: {
              USU_USR: credentials.username,
            },
            select: {
              USU_ID: true,
              USU_USR: true,
              USU_PSS: true,
              USU_NOM: true,
              perfil: {
                select: {
                  PRF_NOM: true,
                  PRF_DSC: true,
                },
              },
            },
          });
          console.log(
            "🚀 ~ file: route.ts:39 ~ authorize ~ userAtuh:",
            userAtuh,
          );

          if (!userAtuh) return null;

          const passwordsMatch = await bcrypt.compare(
            credentials.password,
            userAtuh.USU_PSS,
          );
          // console.log(
          //   "🚀 ~ file: route.ts:47 ~ authorize ~ passwordsMatch:",
          //   passwordsMatch,
          // );

          if (!passwordsMatch) return null;

          const user = {
            id: "",
            name: "",
            username: "",
            rol: "",
            rolDecription: "",
          };

          user.id = userAtuh.USU_ID;
          user.name = userAtuh.USU_NOM;
          user.username = userAtuh.USU_USR;
          user.rol = userAtuh.perfil.PRF_NOM;
          user.rolDecription = userAtuh.perfil.PRF_DSC;

          // console.log("🚀 ~ file: route.ts:58 ~ authorize ~ user:", user);

          return user;
        } catch (error) {
          // console.log("🚀 ~ file: route.ts:31 ~ POST ~ error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  session: {
    strategy: sessionStrategy,
    maxAge: 7 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, session }: any) {
      // console.log(
      //   "🚀 ~ file: route.ts:81 ~ jwt ~ before ~  { token, user, session }:",
      //   {
      //     token,
      //     user,
      //     session,
      //   },
      // );
      if (user) {
        token.user = user;
      }
      // console.log(
      //   "🚀 ~ file: route.ts:81 ~ jwt ~ after ~  { token, user, session }:",
      //   {
      //     token,
      //     user,
      //     session,
      //   },
      // );
      return token;
    },
    async session({
      session,
      token,
      user,
    }: {
      session: any;
      token: any;
      user: any;
    }) {
      // console.log(
      //   "🚀 ~ file: route.ts:86 ~ session ~ before ~ { session, token, user }:",
      //   {
      //     session,
      //     token,
      //     user,
      //   },
      // );
      session.user = token.user;
      // console.log(
      //   "🚀 ~ file: route.ts:86 ~ session ~ after ~ { session, token, user }:",
      //   {
      //     session,
      //     token,
      //     user,
      //   },
      // );
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
