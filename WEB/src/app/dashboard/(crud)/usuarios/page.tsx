// next js
import { GET as getAllUsuarios } from "@/app/api/usuario/all/route";

// components
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import Breadcrumbs from "@/components/ui/breadcrumbs";

// types
import {
  UsuarioWithProfileFlattened,
  UsuarioWithProfile,
} from "@/types/usuario";

type ApiResponse = {
  message: string;
  data: UsuarioWithProfile[];
};

async function getData(): Promise<UsuarioWithProfileFlattened[]> {
  try {
    const response = await getAllUsuarios();
    const apiResponse: ApiResponse = await response.json();
    console.log("🚀 ~ file: page.tsx:21 ~ getData ~ apiResponse:", apiResponse);
    if (response.status !== 200) return [];
    const usuarios: UsuarioWithProfile[] = apiResponse.data;
    console.log("🚀 ~ file: page.tsx:23 ~ getData ~ usuarios:", usuarios);
    const flattenedData = usuarios.map((item) => ({
      ...item,
      ...item.perfil,
      perfil: undefined, // Remove the nested 'perfil' property
    }));
    console.log(
      "🚀 ~ file: page.tsx:37 ~ flattenedData ~ flattenedData:",
      flattenedData,
    );
    flattenedData.forEach((item) => {
      delete item.perfil;
    });
    console.log(
      "🚀 ~ file: page.tsx:44 ~ getData ~ flattenedData:",
      flattenedData,
    );

    return flattenedData;
  } catch (error) {
    console.error("error #%d", error);
    return [];
  }
}

export default async function Page() {
  const data: UsuarioWithProfileFlattened[] = await getData();
  console.log("🚀 ~ file: page.tsx:34 ~ Page ~ data:", data);

  return (
    <div>
      <Breadcrumbs className="mt-[10px]" />
      <h1 className="my-4 text-2xl font-bold">Usuarios</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
