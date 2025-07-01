// react
import { useEffect, useRef } from "@/lib/react";
import { useFormStatus, useFormState } from "@/lib/react-dom";

// server actions
import { createUsuario } from "@/app/actions/usuarioActions";

// components
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

// icons
import { TbMapPlus } from "@/lib/react-icons/tb";

// types
import {
  type UsuarioToAdd,
  type StateAddOne,
  type StateAddMessages,
} from "@/app/actions/usuarioActions";
import { useResetStore } from "@/store/resetToggleStore";
import { AiOutlineUserAdd } from "@/lib/react-icons/ai";

const initialState: StateAddOne = {
  message: null,
  tries: 0,
  type: "default",
  data: {
    USU_NOM: "",
    USU_USR: "",
    USU_PSS: "",
    // USU_RUT: "",
    USU_APA: "",
    USU_AMA: "",
    USU_TEL: 0,
    PRF_ID: "",
    EST_ID: "",
  },
};

type Props = {
  usuario: UsuarioToAdd;
  isFormValid: boolean;
  // setResetForm: React.Dispatch<React.SetStateAction<boolean>>;
};

function ButtonAddComuna({ usuario, isFormValid }: Props) {
  console.log(
    "🚀 ~ file: button-submit.tsx:48 ~ ButtonAddComuna ~ isFormValid:",
    isFormValid,
  );
  const [state, formAction] = useFormState(createUsuario, initialState);
  const { toast } = useToast();
  const { pending } = useFormStatus();
  const { reset, setReset } = useResetStore();

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
      <form action={() => createUsuario(initialState)}>
        <Button
          variant="default"
          disabled={!isFormValid || pending === true ? true : false}
          type="submit"
          formAction={formAction}
          ref={ButtonAddRef}
          className="flex items-center gap-2"
        >
          <span className="block">
            {pending ? "Cargando..." : "Ingresar usuario"}
          </span>
          <AiOutlineUserAdd className="h-4 w-4" />
        </Button>
      </form>
    </>
  );
}

export default ButtonAddComuna;
