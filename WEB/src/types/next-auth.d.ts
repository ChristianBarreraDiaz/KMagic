import NextAuth, { DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      name: string;
      username: string;
      rol: string;
      rolDecription: string;
    };
  }

  // interface User extends DefaultUser {
  //   id: string;
  //   name: string;
  //   username: string;
  //   rol: string;
  //   rolDecription: string;
  // }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: {
      id: string;
      name: string;
      username: string;
      rol: string;
      rolDecription: string;
    };
  }
}
