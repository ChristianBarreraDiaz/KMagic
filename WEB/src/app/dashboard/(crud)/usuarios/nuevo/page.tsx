// next
import { GET as getAllPerfiles } from "@/app/api/profile/all/route";

// components
import PageContent from "./components/page-content";

// types
import { Perfil } from "@prisma/client";

type ApiResponse = {
  message: string;
  data: Perfil[];
};

async function getPerfilesData(): Promise<Perfil[]> {
  try {
    const response = await getAllPerfiles();
    const apiResponse: ApiResponse = await response.json();
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

export default async function Page() {
  const perfilesData = await getPerfilesData();
  console.log("🚀 ~ file: page.tsx:32 ~ Page ~ perfilesData:", perfilesData);

  return (
    <>
      <PageContent perfilesData={perfilesData} />
    </>
  );
}
