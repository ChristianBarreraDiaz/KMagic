"use server";

// next
import { getServerSession } from "@/lib/next-auth/next";

// other packages
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// utils

// types
import { Perfil } from "@prisma/client";

export type PerfilToGet = {
  PRF_ID: string;
};

export async function getPerfilById({ PRF_ID }: PerfilToGet) {
  try {
    const serverSession = await getServerSession(authOptions);

    if (!serverSession) {
      return null;
    }

    if (!PRF_ID || typeof PRF_ID !== "string") {
      return null;
    }

    const perfil: Perfil | null = await prisma.perfil.findUnique({
      where: {
        PRF_ID,
        estado: {
          EST_DSC: true,
        },
      },
    });

    if (!perfil) {
      return null;
    }

    return perfil;
  } catch (error) {
    if (error instanceof Error)
      console.error("error: " + error + " stack: " + error.stack);
    return null;
  }
}
