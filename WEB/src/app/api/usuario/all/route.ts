// next
import { NextResponse } from "@/lib/next/server";
import { getServerSession } from "@/lib/next-auth/next";

// other packages
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const serverSession = await getServerSession(authOptions);

    if (!serverSession)
      return NextResponse.json({
        message: "Not authorized",
        status: 401,
      });

    const users = await prisma.usuario.findMany({
      where: {
        estado: {
          EST_DSC: true,
        },
      },
      include: {
        perfil: {
          select: {
            PRF_ID: true,
            PRF_DSC: true,
          },
        },
      },
    });

    if (!users) {
      return NextResponse.json(
        { message: "An error occurred while getting the users" },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "ok", data: users }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// export const revalidate = 0;

// export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
