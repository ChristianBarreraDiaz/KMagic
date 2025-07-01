import { withAuth } from "@/lib/next-auth/middleware";
import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    // Route protection
    if (
      request.nextUrl.pathname.startsWith("/dashboard") &&
      request.nextauth.token?.user?.rol.toUpperCase().trim() !==
        "ADMINISTRADOR" &&
      request.nextauth.token?.user?.rol.toUpperCase().trim() !==
        "GOBIERNO REGIONAL" &&
      request.nextauth.token?.user?.rol.toUpperCase().trim() !==
        "DELEGACIÓN PRESIDENCIAL PROVINSIAL" &&
      request.nextauth.token?.user?.rol.toUpperCase().trim() !==
        "ENCARGADO DE EMERGENCIAS"
    ) {
      return NextResponse.rewrite(new URL("/auth/denied", request.url));
    }

    if (
      request.nextUrl.pathname.startsWith("/dashboard") &&
      request.nextauth.token?.user?.rol.toUpperCase().trim() === "CONDUCTOR"
    ) {
      return NextResponse.rewrite(new URL("/auth/denied", request.url));
    }

    if (
      request.nextUrl.pathname.startsWith("/dashboard/gobierno%20regional") &&
      request.nextauth.token?.user?.rol.toUpperCase().trim() !==
        "GOBIERNO REGIONAL"
    )
      return NextResponse.rewrite(new URL("/auth/denied", request.url));

    if (
      request.nextUrl.pathname.startsWith(
        "/dashboard/delegación%20presidencial%20provincial",
      ) &&
      request.nextauth.token?.user?.rol.toUpperCase().trim() !==
        "DELEGACIÓN PRESIDENCIAL PROVINSIAL"
    )
      return NextResponse.rewrite(new URL("/auth/denied", request.url));

    if (
      request.nextUrl.pathname.startsWith(
        "/dashboard/encargado%20de%20emergencias",
      ) &&
      request.nextauth.token?.user?.rol.toUpperCase().trim() !==
        "ENCARGADO DE EMERGENCIAS"
    )
      return NextResponse.rewrite(new URL("/auth/denied", request.url));
  },
  {
    callbacks: {
      authorized: ({ req, token }) =>
        req.nextUrl.pathname.startsWith("/dashboard") ? !!token : true,
    },
  },
);

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
