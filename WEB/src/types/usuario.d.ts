import { Usuario } from "@prisma/client";

export type UsuarioWithProfileFlattened = {
  PRF_ID: string;
  PRF_DSC: string;
  USU_ID: string;
  USU_USR: string;
  USU_PSS: string;
  // USU_RUT: string;
  USU_NOM: string;
  USU_APA: string;
  USU_AMA: string;
  USU_TEL: number;
  EST_ID: string;
  CREATED_AT: Date;
  UPDATED_AT: Date;
};

export type UsuarioWithProfile = {
  perfil: {
    PRF_ID: string;
    PRF_DSC: string;
  };
} & Usuario;
