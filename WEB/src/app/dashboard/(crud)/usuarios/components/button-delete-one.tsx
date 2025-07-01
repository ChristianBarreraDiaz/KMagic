// react
import { useEffect, useRef } from "@/lib/react";
import { useFormStatus, useFormState } from "@/lib/react-dom";

// server actions
import {
  deleteOneUsuario,
  type UsuarioToDelete,
  type StateDeleteOne,
  type StateDeleteMessages,
} from "@/app/actions/usuarioActions";

// components
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// icons
import { BsTrash } from "react-icons/bs";

// types
const initialState: StateDeleteOne = {
  message: null,
  tries: 0,
  type: "default",
  data: {
    USU_ID: "",
  },
};

type Props = {
  usuarioId: UsuarioToDelete;
  //   resetRowSelection: React.Dispatch<React.SetStateAction<boolean>>;
};

function ButtonDeleteOne({ usuarioId }: Props) {
  const [state, formAction] = useFormState(deleteOneUsuario, initialState);
  const { toast } = useToast();
  const { pending } = useFormStatus();

  const ButtonDeleteRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    state.data = usuarioId;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuarioId]);

  useEffect(() => {
    let messages: StateDeleteMessages = null;
    if (state.tries !== 0) {
      if (state.type === "success") {
        messages =
          "Felicidades, Se ha eliminado el usuario solicitado de forma satisfactoria";
        toast({
          title: "Exito!",
          description: state.message ?? messages,
        });
        // resetRowSelection(true);
      } else {
        messages =
          "Lo sentimos, no se ha logrado eliminar el usuario solicitado";
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
    if (ButtonDeleteRef.current) {
      ButtonDeleteRef.current.click();
    }
  };

  return (
    <>
      <form action={() => deleteOneUsuario(initialState)} className="hidden">
        <Button
          variant="destructive"
          className="px-4 py-2"
          type="submit"
          formAction={formAction}
          ref={ButtonDeleteRef}
          disabled={pending}
        >
          <BsTrash className="h-4 w-4" />
        </Button>
      </form>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            className="hover:text-accent-white focus:text-accent-white flex h-[36px] w-full cursor-pointer items-center justify-start gap-2 bg-transparent pl-2 pr-2 text-red-500 hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white"
            type="button"
            disabled={pending}
          >
            <BsTrash className="h-4 w-4" />
            <span>{pending ? "Eliminando..." : "Eliminar"}</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no puede ser desecha. Esta eliminará todos lo
              elementos seleccionados de forma permanente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleReTry}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ButtonDeleteOne;
