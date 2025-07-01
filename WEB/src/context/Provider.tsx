"use client";

import { SessionProvider } from "@/lib/next-auth/react";

function Provider({ children, session }: any) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default Provider;
