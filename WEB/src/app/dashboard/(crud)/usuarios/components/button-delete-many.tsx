// react
import { useEffect, useRef } from "@/lib/react";
import { useFormStatus, useFormState } from "@/lib/react-dom";

// server actions
import {
  deleteManyUsuarios,
  type UsuariosToDelete,
  type StateDeleteMany,
  type StateDeleteManyMessages,
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
const initialState: StateDeleteMany = {
  message: null,
  tries: 0,
  type: "default",
  data: {
    usuariosIds: [],
  },
};

type Props = {
  usuariosIds: UsuariosToDelete;
  resetRowSelection: React.Dispatch<React.SetStateAction<boolean>>;
};

function ButtonDeleteMany({ usuariosIds, resetRowSelection }: Props) {
  const [state, formAction] = useFormState(deleteManyUsuarios, initialState);
  const { toast } = useToast();
  const { pending } = useFormStatus();

  const ButtonDeleteRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    state.data = usuariosIds;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuariosIds]);

  useEffect(() => {
    let messages: StateDeleteManyMessages = null;
    if (state.tries !== 0) {
      if (state.type === "success") {
        messages =
          "Felicidades, Se han eliminado los usuarios solicitados de forma satisfactoria";
        toast({
          title: "Exito!",
          description: state.message ?? messages,
        });
        resetRowSelection(true);
      } else {
        messages =
          "Lo sentimos, no se han logrado eliminar los usuarios solicitados";
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
      <form action={() => deleteManyUsuarios(initialState)} className="hidden">
        <Button
          variant="destructive"
          className="px-4 py-2"
          disabled={
            usuariosIds?.usuariosIds?.length === 0 && pending === false
              ? true
              : false
          }
          type="submit"
          formAction={formAction}
          ref={ButtonDeleteRef}
        >
          <BsTrash className="h-4 w-4" />
        </Button>
      </form>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            className="px-4 py-2"
            disabled={
              usuariosIds?.usuariosIds?.length === 0 && pending === false
                ? true
                : false
            }
            type="button"
          >
            <BsTrash className="h-4 w-4" />
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

export default ButtonDeleteMany;
