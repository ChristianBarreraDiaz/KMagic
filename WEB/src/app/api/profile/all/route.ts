// next
import { NextResponse } from "@/lib/next/server";

// other packages
import prisma from "@/lib/prisma";
import { Perfil } from "@prisma/client";
import { getServerSession } from "@/lib/next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const serverSession = await getServerSession(authOptions);

    if (!serverSession)
      return NextResponse.json({
        msg: "Not authorized",
        status: 401,
      });

    const perfiles: Perfil[] = await prisma.perfil.findMany({
      where: {
        estado: {
          EST_DSC: true,
        },
      },
    });

    return NextResponse.json(
      {
        message: "ok",
        data: perfiles,
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
