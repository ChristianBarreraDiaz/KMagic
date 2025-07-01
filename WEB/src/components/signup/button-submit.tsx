// react
import { useEffect, useRef } from "@/lib/react";
import { useFormStatus, useFormState } from "@/lib/react-dom";

// server actions
import { createBaseUsuario } from "@/app/actions/usuarioActions";
import { useRouter } from "next/navigation";

// components
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

// icons

// types
import {
  type UsuarioBaseToAdd,
  type StateAddOneBase,
  type StateAddMessages,
} from "@/app/actions/usuarioActions";
import { useResetStore } from "@/store/resetToggleStore";
import { set } from "react-hook-form";

const initialState: StateAddOneBase = {
  message: null,
  tries: 0,
  type: "default",
  data: {
    USU_NOM: "",
    USU_USR: "",
    USU_PSS: "",
    USU_APA: "",
    USU_AMA: "",
    USU_TEL: 0,
    EST_ID: "",
  },
};

type Props = {
  usuario: UsuarioBaseToAdd;
  isFormValid: boolean;
  // setResetForm: React.Dispatch<React.SetStateAction<boolean>>;
};

function ButtonAddComuna({ usuario, isFormValid }: Props) {
  console.log(
    "🚀 ~ file: button-submit.tsx:48 ~ ButtonAddComuna ~ isFormValid:",
    isFormValid,
  );
  const [state, formAction] = useFormState(createBaseUsuario, initialState);
  const { toast } = useToast();
  const { pending } = useFormStatus();
  const { reset, setReset } = useResetStore();

  const router = useRouter();

  const ButtonAddRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    state.data = usuario;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario]);

  useEffect(() => {
    let messages: StateAddMessages = null;
    if (state.tries !== 0) {
      messages =
        "Felicidades, Se ha ingresado el usuario solicitado de forma satisfactoria";
      if (state.type === "success") {
        toast({
          title: "Exito!",
          description: state.message ?? messages,
        });
        setReset(true);
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        messages =
          "Lo sentimos, no se ha logrado ingresar el usuario solicitado";
        toast({
          variant: "destructive",
          title: "Error!",
          description: state.message ?? messages,
          action: (
            <ToastAction altText="Try again" onClick={handleReTry}>
              Re-intentar
            </ToastAction>
          ),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.tries]);

  const handleReTry = () => {
    if (ButtonAddRef.current) {
      ButtonAddRef.current.click();
    }
  };

  return (
    <>
      <form action={() => createBaseUsuario(initialState)}>
        <Button
          variant="default"
          disabled={!isFormValid || pending === true ? true : false}
          type="submit"
          formAction={formAction}
          ref={ButtonAddRef}
          className="flex min-w-[200px] items-center gap-2"
        >
          <span className="block">
            {pending ? "Cargando..." : "Registrarse"}
          </span>
        </Button>
      </form>
    </>
  );
}

export default ButtonAddComuna;
