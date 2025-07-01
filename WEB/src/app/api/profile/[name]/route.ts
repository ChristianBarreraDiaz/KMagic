// next
import { NextRequest, NextResponse } from "@/lib/next/server";
import { getServerSession } from "@/lib/next-auth/next";

// other packages
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// types
import { Rol } from "@/types/profile";

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } },
) {
  try {
    const serverSession = await getServerSession(authOptions);

    if (!serverSession)
      return NextResponse.json({
        message: "Not authorized",
        status: 401,
      });

    const PRF_NOM: string = params.name;

    if (!PRF_NOM || typeof PRF_NOM !== "string") {
      return NextResponse.json(
        {
          message: "Invalid or missing parameters",
        },
        { status: 401 },
      );
    }

    const profilneNames: Rol[] = await prisma.perfil.findMany({
      select: {
        PRF_NOM: true,
      },
    });

    return NextResponse.json(
      {
        message: "ok",
        data: profilneNames,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
