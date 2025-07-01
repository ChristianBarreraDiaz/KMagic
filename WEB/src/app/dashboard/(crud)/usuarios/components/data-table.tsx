"use client";

import React, { useEffect, useState } from "@/lib/react";

import Link from "@/lib/next/link";
import { type UsuariosToDelete } from "@/app/actions/usuarioActions";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@/lib/tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { FaChevronLeft, FaChevronRight } from "@/lib/react-icons/fa";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "@/lib/react-icons/md";
import { BsReverseListColumnsReverse } from "@/lib/react-icons/bs";
import { AiOutlinePlus } from "@/lib/react-icons/ai";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ButtonDelete from "./button-delete-many";

import { cn } from "@/lib/utils";

import { Usuario } from "@prisma/client";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

type UsuarioId = {
  USU_ID: string;
};

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [resetRowSelection, setResetRowSelection] = useState<boolean>(false);

  useEffect(() => {
    if (resetRowSelection === true) table.resetRowSelection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetRowSelection]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const usuariosIds: UsuarioId[] = table
    .getFilteredSelectedRowModel()
    .rows.map((row) => {
      const usuario: Usuario = row.original as Usuario;
      const { USU_ID } = usuario;
      return { USU_ID };
    });

  const usuariosToDelete: UsuariosToDelete = {
    usuariosIds: usuariosIds,
  };

  return (
    <div className="rounded-lg bg-white px-4 py-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-6 pb-4 md:flex-nowrap md:gap-0">
        <div className="flex flex-wrap items-center gap-6 md:flex-nowrap">
          <Input
            placeholder="Filtrar por usuario..."
            value={
              (table.getColumn("Usuario")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("Usuario")?.setFilterValue(event.target.value)
            }
            className="min-w-[250px] max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-0 md:ml-auto">
                <div className="flex items-center gap-3">
                  <BsReverseListColumnsReverse />
                  <span>Columnas</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <ButtonDelete
                    usuariosIds={usuariosToDelete}
                    resetRowSelection={setResetRowSelection}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent asChild>
                <div>
                  <p>Eliminar usuarios seleccionadas</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Button variant="default" className="ml-0 md:ml-auto" asChild>
          <Link
            className="flex items-center gap-3"
            href="/dashboard/usuarios/nuevo"
          >
            <AiOutlinePlus />
            <span>Ingresar Usuarios</span>
          </Link>
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "px-4 py-2",
                        { "px-8": cell.id.includes("Usuario") },
                        { "px-8": cell.id.includes("Nombre") },
                        { "px-8": cell.id.includes("Apellido paterno") },
                        { "px-8": cell.id.includes("Apellido materno") },
                        { "px-8": cell.id.includes("Fono") },
                        { "px-8": cell.id.includes("Perfil") },
                        { "w-[48px]": cell.id.includes("select") },
                        { "w-[32px] px-4 py-2": cell.id.includes("actions") },
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sin resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 md:flex-nowrap">
        <div className="flex-1 text-center text-sm text-muted-foreground md:text-left">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} fila(s) selecionada(s).
        </div>
        <div className="mx-auto my-0 flex flex-wrap items-center gap-4 space-x-6 md:flex-nowrap lg:space-x-8">
          <div className="mx-auto my-0 flex items-center space-x-2">
            <p className="text-sm font-medium">Filas por página</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[120px] items-center justify-center text-sm font-medium">
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </div>
          <div className="mx-auto my-0 flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Ir a la primera página</span>
              <MdKeyboardDoubleArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Ir a la página anterior</span>
              <FaChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Ir a la página siguiente</span>
              <FaChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Ir a la última página</span>
              <MdKeyboardDoubleArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
