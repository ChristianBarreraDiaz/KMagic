// react
import { useEffect, useRef } from "@/lib/react";
import { useFormStatus, useFormState } from "@/lib/react-dom";

// server actions
import {
  updateUsuario,
  type StateUpdateOne,
  type UsuarioToUpdate,
  type StateUpdateMessages,
} from "@/app/actions/usuarioActions";

// components
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

// icons
import { BiEditAlt } from "@/lib/react-icons/bi";

// other packages
import { useResetStore } from "@/store/resetToggleStore";

const initialState: StateUpdateOne = {
  message: null,
  tries: 0,
  type: "default",
  data: {
    USU_ID: "",
    USU_NOM: "",
    USU_USR: "",
    USU_PSS: "",
    // USU_RUT: "",
    USU_APA: "",
    USU_AMA: "",
    USU_TEL: 0,
    PRF_ID: "",
  },
};

type Props = {
  usuario: UsuarioToUpdate;
  isFormValid: boolean;
  // setResetForm: React.Dispatch<React.SetStateAction<boolean>>;
};

function ButtonUpdate({ usuario, isFormValid }: Props) {
  console.log(
    "🚀 ~ file: button-update.tsx:48 ~ ButtonUpdate ~ isFormValid:",
    isFormValid,
  );
  console.log(
    "🚀 ~ file: button-update.tsx:47 ~ ButtonUpdate ~ usuario:",
    usuario,
  );

  const [state, formAction] = useFormState(updateUsuario, initialState);
  const { toast } = useToast();
  const { pending } = useFormStatus();
  const { reset, setReset } = useResetStore();

  const ButtonUpdateRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    state.data = usuario;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario]);

  useEffect(() => {
    let messages: StateUpdateMessages = null;
    if (state.tries !== 0) {
      if (state.type === "success") {
        messages =
          "Felicidades, Se ha actualizado el usuario solicitado de forma satisfactoria";
        toast({
          title: "Exito!",
          description: state.message ?? messages,
        });
        // setReset(true);
      } else {
        messages =
          "Lo sentimos, no se ha logrado actualizar el usuario solicitado";
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
    if (ButtonUpdateRef.current) {
      ButtonUpdateRef.current.click();
    }
  };

  return (
    <>
      <form action={() => updateUsuario(initialState)}>
        <Button
          variant="default"
          disabled={!isFormValid || pending === true ? true : false}
          type="submit"
          formAction={formAction}
          ref={ButtonUpdateRef}
          className="flex items-center gap-2"
        >
          <span className="block">
            {pending ? "Cargando..." : "Actualizar región"}
          </span>
          <BiEditAlt className="h-4 w-4" />
        </Button>
      </form>
    </>
  );
}

export default ButtonUpdate;
