import React from "@/lib/react";
import { cn } from "@/lib/utils";

import { Check, X, ChevronsUpDown } from "@/lib/lucide-react";
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
import { Badge } from "@/components/ui/badge";

export type Selected = {
  label: string;
  id: string;
};

export type OptionType = {
  label: string;
  value: string;
  Id: string;
};

interface MultiSelectProps {
  options: OptionType[];
  selected: Selected[];
  onChange: React.Dispatch<React.SetStateAction<Selected[]>>;
  className?: string;
}

function MultiSelect({
  options,
  selected,
  onChange,
  className,
  ...props
}: MultiSelectProps) {
  console.log("🚀 ~ file: multi-select.tsx:45 ~ className:", className);
  console.log("🚀 ~ file: multi-select.tsx:45 ~ selected:", selected);
  console.log("🚀 ~ file: multi-select.tsx:45 ~ options:", options);
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (item: Selected) => {
    onChange(selected.filter((i) => i.id !== item.id));
  };

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "h-10 w-full justify-between",
            { "h-full": selected.length > 1 },
            className,
          )}
          onClick={() => setOpen(!open)}
          asChild
        >
          <div
            className="cursor-pointer focus-visible:outline-none focus-visible:ring-2"
            tabIndex={0}
          >
            <div className="relative flex flex-wrap gap-1">
              <span
                className={cn("absolute -top-[10px]", {
                  hidden: selected.length > 0,
                })}
              >
                seleccionar
              </span>
              {selected.map((item) => (
                <Badge
                  variant="secondary"
                  key={item.id}
                  className="mb-1 mr-1"
                  onClick={() => handleUnselect(item)}
                >
                  {item.label}
                  <button
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(item);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(item)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              ))}
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className={className}>
          <CommandInput placeholder="Buscar ..." />
          <CommandEmpty>Item no encontrado.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  const selectedItem: Selected = {
                    label: option.label,
                    id: option.Id,
                  };

                  onChange(
                    selected.some((item) => item.id === option.Id)
                      ? selected.filter((item) => item.id !== option.Id)
                      : [...selected, selectedItem],
                  );
                  setOpen(true);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected.some((item) => item.id === option.Id)
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { MultiSelect };
