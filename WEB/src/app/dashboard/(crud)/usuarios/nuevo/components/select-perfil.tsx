"use client";

import { useEffect, useState } from "@/lib/react";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  PerfilSelectData: PerfilSelect[];
  setSelectedPerfil: React.Dispatch<React.SetStateAction<PerfilSelect>>;
  selectedPerfil: PerfilSelect;
};

type PerfilSelect = {
  value: string;
  label: string;
  id: string;
};

export default function SelectPerfil({
  PerfilSelectData,
  setSelectedPerfil,
  selectedPerfil,
}: Props) {
  console.log(
    "🚀 ~ file: select-provincia.tsx:39 ~ PerfilSelectData:",
    PerfilSelectData,
  );

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [perfiles, setPerfiles] = useState<PerfilSelect[]>(PerfilSelectData);

  useEffect(() => {
    setPerfiles(PerfilSelectData);
    console.log("🚀 ~ file: select-provincia.tsx:44 ~ perfiles:", perfiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PerfilSelectData]);

  useEffect(() => {
    if (selectedPerfil.value === "") {
      setValue("");
    }
  }, [selectedPerfil]);

  //   value.trim().toLowerCase() === ""

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value && value !== ""
            ? perfiles.find(
                (perfil) =>
                  perfil.value.trim().toLowerCase() ==
                  value.trim().toLowerCase(),
              )?.label
            : "seleccionar"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar región..." />
          <CommandEmpty>No se han encontrado regiones.</CommandEmpty>
          <CommandGroup>
            {perfiles.map((perfil) => (
              <CommandItem
                key={perfil.id}
                value={perfil.value}
                onSelect={(currentValue) => {
                  setValue(
                    currentValue.trim().toLowerCase() ===
                      value.trim().toLowerCase()
                      ? ""
                      : currentValue,
                  );
                  setOpen(false);
                  setSelectedPerfil(perfil);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value.trim().toLowerCase() ===
                      perfil.value.trim().toLowerCase() && value !== ""
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                {perfil.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
