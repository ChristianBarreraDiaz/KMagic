"use server";

// next
import { revalidatePath } from "@/lib/next/cache";
import { getServerSession } from "@/lib/next-auth/next";

// other packages
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { capitalizeFirstLetter } from "@/utils/capitalizeLetterFormatter";

// utils
import { sanitizeToLettersWithSpaces } from "@/utils/stringSanitizer";
import { validateEmail } from "@/utils/emailValidator";
import { pascalCaseFormatter } from "@/utils/pascalCaseFormatter";

// types
import { Usuario } from "@prisma/client";
import bcrypt from "@/lib/bcrypt";

export type UsuarioToGet = {
  USU_ID: string;
};

export type UsuarioToAdd = {
  USU_USR: string;
  USU_PSS: string;
  // USU_RUT: string;
  USU_NOM: string;
  USU_APA: string;
  USU_AMA: string;
  USU_TEL: number;
  PRF_ID: string;
  EST_ID: string;
};
export type UsuarioBaseToAdd = {
  USU_USR: string;
  USU_PSS: string;
  USU_NOM: string;
  USU_APA: string;
  USU_AMA: string;
  USU_TEL: number;
  EST_ID: string;
};

export type UsuarioToUpdate = {
  USU_ID: string;
  USU_USR?: string;
  USU_PSS?: string;
  // USU_RUT?: string;
  USU_NOM?: string;
  USU_APA?: string;
  USU_AMA?: string;
  USU_TEL?: number;
  PRF_ID?: string;
};

export type UsuarioToDelete = {
  USU_ID: string;
};

export type UsuariosToDelete = {
  usuariosIds: UsuarioToDelete[];
};

export type StateAddOne = {
  message: StateAddMessages;
  tries: number;
  type: ToastTypes;
  data: UsuarioToAdd;
};

export type StateAddOneBase = {
  message: StateAddMessages;
  tries: number;
  type: ToastTypes;
  data: UsuarioBaseToAdd;
};

export type StateUpdateOne = {
  message: StateUpdateMessages;
  tries: number;
  type: ToastTypes;
  data: UsuarioToUpdate;
};

export type StateDeleteOne = {
  message: StateDeleteMessages;
  tries: number;
  type: ToastTypes;
  data: UsuarioToDelete;
};

export type StateDeleteMany = {
  message: StateDeleteManyMessages;
  tries: number;
  type: ToastTypes;
  data: UsuariosToDelete;
};

type ToastTypes = "success" | "error" | "default";

// general state messages
type StateDefaultMessages = null;

type StateErrorMessages =
  | "Lo sentimos, no cuentas con una sesión o esta ha caducado"
  | "Lo sentimos, los datos ingresados son inválidos o están incompletos"
  | "Lo sentimos, ha ocurrido un error inesperado";

// specific state messages
export type StateAddMessages =
  | StateDefaultMessages
  | StateErrorMessages
  | StateAddErrorMessages
  | StateAddSuccessMessages
  | StateAddBaseErrorMessages
  | StateAddBaseSuccessMessages;

type StateAddErrorMessages =
  "Lo sentimos, no se ha logrado ingresar el usuario solicitado";

type StateAddSuccessMessages =
  "Felicidades, Se ha ingresado el usuario solicitado de forma satisfactoria";

type StateAddBaseErrorMessages =
  "Lo sentimos, ah ocurrido un error al registrarse";

type StateAddBaseSuccessMessages =
  "Felicidades, Se ha registrado forma satisfactoria";

export type StateUpdateMessages =
  | StateDefaultMessages
  | StateErrorMessages
  | StateUpdateErrorMessages
  | StateUpdateSuccessMessages;

type StateUpdateErrorMessages =
  "Lo sentimos, no se ha logrado actualizar el usuario solicitado";

type StateUpdateSuccessMessages =
  "Felicidades, Se ha actualizado el usuario solicitado de forma satisfactoria";

export type StateDeleteMessages =
  | StateDefaultMessages
  | StateErrorMessages
  | StateDeleteErrorMessages
  | StateDeleteSuccessMessages;

type StateDeleteErrorMessages =
  "Lo sentimos, no se ha logrado eliminar el usuario solicitado";

type StateDeleteSuccessMessages =
  "Felicidades, Se ha eliminado el usuario solicitado de forma satisfactoria";

export type StateDeleteManyMessages =
  | StateDefaultMessages
  | StateErrorMessages
  | StateDeleteManyErrorMessages
  | StateDeleteManySuccessMessages;

type StateDeleteManyErrorMessages =
  "Lo sentimos, no se han logrado eliminar los usuarios solicitados";

type StateDeleteManySuccessMessages =
  "Felicidades, Se han eliminado los usuarios solicitados de forma satisfactoria";

// get
export async function getUsuario({ USU_ID }: UsuarioToGet) {
  try {
    const serverSession = await getServerSession(authOptions);

    if (!serverSession) {
      return null;
    }

    if (!USU_ID || typeof USU_ID !== "string") {
      return null;
    }

    const usuario: Usuario | null = await prisma.usuario.findUnique({
      where: {
        USU_ID: USU_ID,
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

    if (!usuario) {
      return null;
    }

    return usuario;
  } catch (error) {
    if (error instanceof Error)
      console.error("error: " + error + " stack: " + error.stack);
    return null;
  }
}

// add one base user
async function prismaCreateBaseUsuario({
  USU_AMA,
  USU_APA,
  USU_NOM,
  USU_PSS,
  USU_TEL,
  USU_USR,
  PRF_ID,
  EST_ID,
}: UsuarioToAdd) {
  console.log("🚀 ~ file: usuarioActions.ts:221 ~ EST_ID:", EST_ID);
  console.log("🚀 ~ file: usuarioActions.ts:221 ~ PRF_ID:", PRF_ID);
  console.log("🚀 ~ file: usuarioActions.ts:221 ~ USU_USR:", USU_USR);
  console.log("🚀 ~ file: usuarioActions.ts:221 ~ USU_TEL:", USU_TEL);
  console.log("🚀 ~ file: usuarioActions.ts:221 ~ USU_PSS:", USU_PSS);
  console.log("🚀 ~ file: usuarioActions.ts:221 ~ USU_NOM:", USU_NOM);
  console.log("🚀 ~ file: usuarioActions.ts:221 ~ USU_APA:", USU_APA);
  console.log("🚀 ~ file: usuarioActions.ts:221 ~ USU_AMA:", USU_AMA);
  const usuario: Usuario = await prisma.usuario.create({
    data: {
      USU_NOM,
      USU_AMA,
      USU_APA,
      USU_PSS,
      USU_TEL,
      USU_USR,
      EST_ID,
      PRF_ID,
    },
  });
  console.log("🚀 ~ file: usuarioActions.ts:233 ~ usuario:", usuario);
  return usuario;
}

export async function createBaseUsuario(previousState: StateAddOneBase) {
  try {
    console.log(
      "🚀 ~ file: usuariosActions.ts:206 ~ createUsuario ~ previousState:",
      previousState,
    );

    const estado = await prisma.estado.findMany({
      where: {
        EST_DSC: true,
      },
    });

    if (
      estado?.length !== 1 ||
      !estado[0]?.EST_ID ||
      typeof estado[0]?.EST_ID !== "string"
    ) {
      previousState.message = "Lo sentimos, ha ocurrido un error inesperado";
      previousState.tries = previousState.tries + 1;
      previousState.type = "error";
      return previousState;
    }

    const perfilNombre = await prisma.perfil.findMany({
      where: {
        PRF_NOM: "USUARIO",
      },
    });

    if (
      perfilNombre?.length !== 1 ||
      !perfilNombre[0]?.PRF_NOM ||
      typeof perfilNombre[0]?.PRF_NOM !== "string" ||
      !perfilNombre[0]?.PRF_DSC ||
      typeof perfilNombre[0]?.PRF_DSC !== "string"
    ) {
      previousState.message = "Lo sentimos, ha ocurrido un error inesperado";
      previousState.tries = previousState.tries + 1;
      previousState.type = "error";
      return previousState;
    }

    const data: UsuarioBaseToAdd = previousState.data;
    console.log(
      "🚀 ~ file: usuariosActions.ts:214 ~ createUsuario ~ data:",
      data,
    );

    if (
      !data?.USU_AMA ||
      typeof data?.USU_AMA !== "string" ||
      !data?.USU_APA ||
      typeof data?.USU_APA !== "string" ||
      !data?.USU_NOM ||
      typeof data?.USU_NOM !== "string" ||
      !data?.USU_PSS ||
      typeof data?.USU_PSS !== "string" ||
      !data?.USU_TEL ||
      typeof data?.USU_TEL !== "number"
    ) {
      previousState.message =
        "Lo sentimos, los datos ingresados son inválidos o están incompletos";
      previousState.tries = previousState.tries + 1;
      previousState.type = "error";
      return previousState;
    }

    const isUserValid = validateEmail(data.USU_USR);

    if (!isUserValid) {
      previousState.message =
        "Lo sentimos, los datos ingresados son inválidos o están incompletos";
      previousState.tries = previousState.tries + 1;
      previousState.type = "error";
      return previousState;
    }

    const usuarioNomCapitalized = pascalCaseFormatter(
      sanitizeToLettersWithSpaces(sanitizeToLettersWithSpaces(data.USU_NOM)),
    );
    const usuarioApellidoPaternoCapitalized = pascalCaseFormatter(
      sanitizeToLettersWithSpaces(sanitizeToLettersWithSpaces(data.USU_APA)),
    );
    const usuarioApellidoMaternoCapitalized = pascalCaseFormatter(
      sanitizeToLettersWithSpaces(sanitizeToLettersWithSpaces(data.USU_AMA)),
    );
    const hashedPassword = await bcrypt.hash(data.USU_PSS, 10);

    const usuario: Usuario = await prismaCreateBaseUsuario({
      PRF_ID: perfilNombre[0].PRF_ID,
      USU_AMA: usuarioApellidoMaternoCapitalized,
      USU_APA: usuarioApellidoPaternoCapitalized,
      USU_NOM: usuarioNomCapitalized,
      USU_PSS: hashedPassword,
      USU_TEL: data.USU_TEL,
      USU_USR: data.USU_USR,
      EST_ID: estado[0].EST_ID,
    });

    if (!usuario) {
      previousState.message =
        "Lo sentimos, ah ocurrido un error al registrarse";
      previousState.tries = previousState.tries + 1;
      previousState.type = "error";
      return previousState;
    }

    revalidatePath("/dashboard/usuarios", "page");

    previousState.message = "Felicidades, Se ha registrado forma satisfactoria";
    previousState.tries = previousState.tries + 1;
    previousState.type = "success";
    return previousState;
  } catch (error) {
    if (error instanceof Error)
      console.error("error: " + error + " stack: " + error.stack);

    previousState.message = "Lo sentimos, ha ocurrido un error inesperado";
    previousState.tries = previousState.tries + 1;
    previousState.type = "error";
    return previousState;
  }
}
// add one
async function prismaCreateUsuario({
  PRF_ID,
  USU_AMA,
  USU_APA,
  USU_NOM,
  USU_PSS,
  // USU_RUT,
  USU_TEL,
  USU_USR,
  EST_ID,
}: UsuarioToAdd) {
  const usuario: Usuario = await prisma.usuario.create({
    data: {
      USU_NOM,
      USU_AMA,
      USU_APA,
      USU_PSS,
      // USU_RUT,
      USU_TEL,
      USU_USR,
      PRF_ID,
      EST_ID,
    },
  });
  return usuario;
}

export async function createUsuario(previousState: StateAddOne) {
  try {
    const serverSession = await getServerSession(authOptions);

    if (!serverSession) {
      previousState.message =
        "Lo sentimos, no cuentas con una sesión o esta ha caducado";
      previousState.tries = previousState.tries + 1;
      previousState.type = "error";
      return previousState;
    }

    console.log(
      "🚀 ~ file: usuariosActions.ts:206 ~ createUsuario ~ previousState:",
      previousState,
    );

    const estado = await prisma.estado.findMany({
      where: {
        EST_DSC: true,
      },
    });

    if (
      estado?.length !== 1 ||
      !estado[0]?.EST_ID ||
      typeof estado[0]?.EST_ID !== "string"
    ) {
      previousState.message = "Lo sentimos, ha ocurrido un error inesperado";
      previousState.tries = previousState.tries + 1;
      previousState.type = "error";
      return previousState;
    }

    const data: UsuarioToAdd = previousState.data;
    console.log(
      "🚀 ~ file: usuariosActions.ts:214 ~ createUsuario ~ data:",
      data,
    );

    if (
      !data?.USU_AMA ||
      typeof data?.USU_AMA !== "string" ||
      !data?.USU_APA ||
      typeof data?.USU_APA !== "string" ||
      !data?.USU_NOM ||
      typeof data?.USU_NOM !== "string" ||
      !data?.USU_PSS ||
      typeof data?.USU_PSS !== "string" ||
      // !data?.USU_RUT ||
      // typeof data?.USU_RUT !== "string" ||
      !data?.USU_TEL ||
      typeof data?.USU_TEL !== "number" ||
      !data?.PRF_ID ||
      typeof data?.PRF_ID !== "string"
    ) {
      previousState.message =
        "Lo sentimos, los datos ingresados son inválidos o están incompletos";
      previousState.tries = previousState.tries + 1;
      previousState.type = "error";
      return previousState;
    }

    // const formattedRut = formatRut(data.USU_RUT);
    // const rutIsValid = validateRut(formattedRut);

    // const formattedUser = validateEmail(data.USU_USR);
    // const userRutIsValid = validateRut(formattedUser);

    const isUserValid = validateEmail(data.USU_USR);

    if (!isUserValid) {
      previousState.message =
        "Lo sentimos, los datos ingresados son inválidos o están incompletos";
      previousState.tries = previousState.tries + 1;
      previousState.type = "error";
      return previousState;
    }

    const usuarioNomCapitalized = pascalCaseFormatter(
      sanitizeToLettersWithSpaces(sanitizeToLettersWithSpaces(data.USU_NOM)),
    );
    const usuarioApellidoPaternoCapitalized = pascalCaseFormatter(
      sanitizeToLettersWithSpaces(sanitizeToLettersWithSpaces(data.USU_APA)),
    );
    const usuarioApellidoMaternoCapitalized = pascalCaseFormatter(
      sanitizeToLettersWithSpaces(sanitizeToLettersWithSpaces(data.USU_AMA)),
    );
    const hashedPassword = await bcrypt.hash(data.USU_PSS, 10);

    const usuario: Usuario = await prismaCreateUsuario({
      PRF_ID: data.PRF_ID,
      USU_AMA: usuarioApellidoMaternoCapitalized,
      USU_APA: usuarioApellidoPaternoCapitalized,
      USU_NOM: usuarioNomCapitalized,
      USU_PSS: hashedPassword,
      // USU_RUT: formattedRut,
      USU_TEL: data.USU_TEL,
      USU_USR: data.USU_USR,
      EST_ID: estado[0].EST_ID,
    });

    if (!usuario) {
      previousState.message =
        "Lo sentimos, no se ha logrado ingresar el usuario solicitado";
      previousState.tries = previousState.tries + 1;
      previousState.type = "error";
      return previousState;
    }

    revalidatePath("/dashboard/usuarios", "page");

    previousState.message =
      "Felicidades, Se ha ingresado el usuario solicitado de forma satisfactoria";
    previousState.tries = previousState.tries + 1;
    previousState.type = "success";
    return previousState;
  } catch (error) {
    if (error instanceof Error)
      console.error("error: " + error + " stack: " + error.stack);

    previousState.message = "Lo sentimos, ha ocurrido un error inesperado";
    previousState.tries = previousState.tries + 1;
    previousState.type = "error";
    return previousState;
  }
}

// update one
async function prismaUpdateUsuario({
  USU_ID,
  PRF_ID,
  USU_AMA,
  USU_APA,
  USU_NOM,
  USU_PSS,
  // USU_RUT,
  USU_TEL,
  USU_USR,
}: UsuarioToUpdate) {
  const usuario: Usuario = await prisma.usuario.update({
    where: {
      USU_ID: USU_ID,
    },
    data: {
      USU_NOM,
      USU_AMA,
      USU_APA,
      USU_PSS,
      // USU_RUT,
      USU_TEL,
      USU_USR,
      PRF_ID,
    },
  });

  return usuario;
}

export async function updateUsuario(previousState: StateUpdateOne) {
  try {
    const serverSession = await getServerSession(authOptions);

    if (!serverSession) {
      previousState.message =
        "Lo sentimos, no cuentas con una sesión o esta ha caducado";
      previousState.tries = previousState.tries + 1;
      previousState.type = "error";
      return previousState;
    }

    console.log(
      "🚀 ~ file: provinciaActions.ts:334 ~ updateProvincia ~ previousState:",
      previousState,
    );

    const data: UsuarioToUpdate = previousState.data;

    if (!data?.USU_ID && typeof data?.USU_ID !== "string") {
      previousState.message =
        "Lo sentimos, los datos ingresados son inválidos o están incompletos";
      previousState.tries = previousState.tries + 1;
      previousState.type = "error";
      return previousState;
    }

    if (
      !data?.USU_AMA &&
      typeof data?.USU_AMA !== "string" &&
      !data?.USU_APA &&
      typeof data?.USU_APA !== "string" &&
      !data?.USU_NOM &&
      typeof data?.USU_NOM !== "string" &&
      !data?.USU_PSS &&
      typeof data?.USU_PSS !== "string" &&
      // !data?.USU_RUT &&
      // typeof data?.USU_RUT !== "string" &&
      !data?.USU_TEL &&
      typeof data?.USU_TEL !== "number" &&
      !data?.PRF_ID &&
      typeof data?.PRF_ID !== "string"
    ) {
      previousState.message =
        "Lo sentimos, los datos ingresados son inválidos o están incompletos";
      previousState.tries = previousState.tries + 1;
      previousState.type = "error";
      return previousState;
    }

    let usuarioNomCapitalized = undefined;
    let usuarioApellidoPaternoCapitalized = undefined;
    let usuarioApellidoMaternoCapitalized = undefined;
    let formattedRut = undefined;
    let rutIsValid = false;
    let formattedUser = undefined;
    let userRutIsValid = false;
    let hashedPassword = undefined;

    if (data?.USU_NOM && typeof data?.USU_NOM === "string") {
      usuarioNomCapitalized = pascalCaseFormatter(
        sanitizeToLettersWithSpaces(data.USU_NOM),
      );
    }

    if (data?.USU_APA && typeof data?.USU_APA === "string") {
      usuarioApellidoPaternoCapitalized = pascalCaseFormatter(
        sanitizeToLettersWithSpaces(data.USU_APA),
      );
    }

    if (data?.USU_AMA && typeof data?.USU_AMA === "string") {
      usuarioApellidoMaternoCapitalized = pascalCaseFormatter(
        sanitizeToLettersWithSpaces(data.USU_AMA),
      );
    }

    const isUserValid = validateEmail(data?.USU_USR ?? "");
    if (data?.USU_USR && typeof data?.USU_USR === "string" && !isUserValid) {
      previousState.message =
        "Lo sentimos, los datos ingresados son inválidos o están incompletos";
      previousState.tries = previousState.tries + 1;
      previousState.type = "error";
      return previousState;
    }

    if (data?.USU_PSS && typeof data?.USU_PSS === "string") {
      hashedPassword = await bcrypt.hash(data.USU_PSS, 10);
    }

    const usuario = await prismaUpdateUsuario({
      USU_ID: data.USU_ID,
      PRF_ID: data?.PRF_ID,
      USU_AMA: usuarioApellidoMaternoCapitalized,
      USU_APA: usuarioApellidoPaternoCapitalized,
      USU_NOM: usuarioNomCapitalized,
      USU_PSS: hashedPassword,
      // USU_RUT: formattedRut,
      USU_TEL: data?.USU_TEL,
      USU_USR: formattedUser,
    });

    if (!usuario) {
      previousState.message =
        "Lo sentimos, no se ha logrado actualizar el usuario solicitado";
      previousState.tries = previousState.tries + 1;
      previousState.type = "error";
      return previousState;
    }

    revalidatePath("/dashboard/usuarios", "page");

    previousState.message =
      "Felicidades, Se ha actualizado el usuario solicitado de forma satisfactoria";
    previousState.tries = previousState.tries + 1;
    previousState.type = "success";
    return previousState;
  } catch (error) {
    if (error instanceof Error)
      console.error("error: " + error + " stack: " + error.stack);

    previousState.message = "Lo sentimos, ha ocurrido un error inesperado";
    previousState.tries = previousState.tries + 1;
    previousState.type = "error";
    return previousState;
  }
}

// delete one
async function prismaDeleteOneUsuario({ USU_ID }: UsuarioToDelete) {
  const usuario: Usuario = await prisma.usuario.update({
    where: {
      USU_ID,
    },
    data: {
      estado: {
        connectOrCreate: {
          where: {
            EST_DSC: false,
          },
          create: {
            EST_DSC: false,
          },
        },
      },
    },
  });
  console.log(
    "🚀 ~ file: usuariosActions.ts:523 ~ prismaDeleteOneUsuario ~ usuario:",
    usuario,
  );

  return usuario;
}

export async function deleteOneUsuario(previousState: StateDeleteOne) {
  try {
    const serverSession = await getServerSession(authOptions);

    if (!serverSession) {
      previousState.message =
        "Lo sentimos, no cuentas con una sesión o esta ha caducado";
      previousState.tries = previousState.tries + 1;
      previousState.type = "error";
      return previousState;
    }

    console.log(
      "🚀 ~ file: usuariosActions.ts:538 ~ deleteOneUsuario ~ previousState:",
      previousState,
    );

    const data: UsuarioToDelete = previousState.data;
    console.log(
      "🚀 ~ file: localidadesActions.ts:394 ~ deleteOneLocalidad ~ data:",
      data,
    );

    if (!data?.USU_ID || typeof data?.USU_ID !== "string") {
      previousState.message =
        "Lo sentimos, los datos ingresados son inválidos o están incompletos";
      previousState.tries = previousState.tries + 1;
      previousState.type = "error";
      return previousState;
    }

    const usuario: Usuario = await prismaDeleteOneUsuario(data);
    console.log(
      "🚀 ~ file: usuariosActions.ts:557 ~ deleteOneUsuario ~ usuario:",
      usuario,
    );

    if (!usuario) {
      previousState.message =
        "Lo sentimos, no se ha logrado eliminar el usuario solicitado";
      previousState.tries = previousState.tries + 1;
      previousState.type = "error";
      return previousState;
    }

    revalidatePath("/dashboard/usuarios", "page");

    previousState.message =
      "Felicidades, Se ha eliminado el usuario solicitado de forma satisfactoria";
    previousState.tries = previousState.tries + 1;
    previousState.type = "success";
    return previousState;
  } catch (error) {
    console.log(
      "🚀 ~ file: localidadesActions.ts:434 ~ deleteOneLocalidad ~ error:",
      error,
    );
    console.error(error);
    previousState.message = "Lo sentimos, ha ocurrido un error inesperado";
    previousState.tries = previousState.tries + 1;
    previousState.type = "error";
    return previousState;
  }
}

// delete many
async function prismaDeleteManyUsuarios({ usuariosIds }: UsuariosToDelete) {
  const usuarios = await usuariosIds.map(async ({ USU_ID }) => {
    const usuario: Usuario = await prisma.usuario.update({
      where: {
        USU_ID,
      },
      data: {
        estado: {
          connectOrCreate: {
            where: {
              EST_DSC: false,
            },
            create: {
              EST_DSC: false,
            },
          },
        },
      },
    });
    return usuario;
  });

  return usuarios;
}

export async function deleteManyUsuarios(previousState: StateDeleteMany) {
  try {
    const serverSession = await getServerSession(authOptions);

    if (!serverSession) {
      previousState.message =
        "Lo sentimos, no cuentas con una sesión o esta ha caducado";
      previousState.tries = previousState.tries + 1;
      previousState.type = "error";
      return previousState;
    }

    const data: UsuariosToDelete = previousState.data;

    const usuarios = await prismaDeleteManyUsuarios(data);

    if (!usuarios) {
      previousState.message =
        "Lo sentimos, no se han logrado eliminar los usuarios solicitados";
      previousState.tries = previousState.tries + 1;
      previousState.type = "error";
      return previousState;
    }

    revalidatePath("/dashboard/usuarios", "page");

    previousState.message =
      "Felicidades, Se han eliminado los usuarios solicitados de forma satisfactoria";
    previousState.tries = previousState.tries + 1;
    previousState.type = "success";
    return previousState;
  } catch (error) {
    console.error(error);
    previousState.message = "Lo sentimos, ha ocurrido un error inesperado";
    previousState.tries = previousState.tries + 1;
    previousState.type = "error";
    return previousState;
  }
}
