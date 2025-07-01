// next
import { GET as getAllPerfiles } from "@/app/api/profile/all/route";

import { getUsuario, UsuarioToGet } from "@/app/actions/usuarioActions";

// components
import PageContent from "./components/page-content";

// types
import { Perfil } from "@prisma/client";

import {
  UsuarioWithProfileFlattened,
  UsuarioWithProfile,
} from "@/types/usuario";

type GetPerfilResponse = {
  message: string;
  data: Perfil[];
};

async function getPerfilesData(): Promise<Perfil[]> {
  try {
    const response = await getAllPerfiles();
    const apiResponse: GetPerfilResponse = await response.json();
    if (response.status !== 200) return [];
    const perfiles: Perfil[] = apiResponse.data;
    console.log(
      "🚀 ~ file: page.tsx:21 ~ getPerfilesData ~ perfiles:",
      perfiles,
    );

    return perfiles;
  } catch (error) {
    console.error("error #%d", error);
    return [];
  }
}

async function getUsuarioData({
  USU_ID,
}: UsuarioToGet): Promise<UsuarioWithProfileFlattened> {
  try {
    const response = await getUsuario({ USU_ID });
    console.log(
      "🚀 ~ file: page.tsx:51 ~ getUsuarioData ~ response:",
      response,
    );

    // Assuming 'response' has a structure like { usuario: UsuarioWithProfile, otherData: ... }
    const usuario: UsuarioWithProfile =
      response as unknown as UsuarioWithProfile;

    // Flatten the user profile data and remove the 'perfil' property
    const { perfil, ...usuarioWithProfileFlattened } = {
      ...usuario,
      ...usuario.perfil, // Spread the 'perfil' property
    };
    console.log(
      "🚀 ~ file: page.tsx:56 ~ usuarioWithProfileFlattened:",
      usuarioWithProfileFlattened,
    );

    return usuarioWithProfileFlattened;
  } catch (error) {
    console.error("error #%d", error);
    return {} as UsuarioWithProfileFlattened; // Return an empty object or handle the error accordingly
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const perfilesData = await getPerfilesData();

  const usuarioWithEstado = await getUsuarioData({
    USU_ID: params.id,
  });
  console.log(
    "🚀 ~ file: page.tsx:86 ~ Page ~ usuarioWithEstado:",
    usuarioWithEstado,
  );

  return (
    <>
      <PageContent
        perfilesData={perfilesData}
        usuariowithEstado={usuarioWithEstado}
      />
    </>
  );
}
