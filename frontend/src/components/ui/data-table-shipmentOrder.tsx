"use client";

import React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  type: "shipment" | "order";
}

export function DataTable<TData, TValue>({
  columns,
  data,
  type,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
  });

  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <div className="rounded-xl border">
      {/* @ts-ignore */}
      <div className="filter-input">
        <select
          name=""
          id=""
          value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("status")?.setFilterValue(event.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Filter Status</option>
          {type === "shipment" ? (
            <option value="Shipped">Shipped</option>
          ) : (
            <option value="Success">Success</option>
          )}
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        {table.getColumn("status")?.getFilterValue() && (
          <button
            onClick={() => {
              table.getColumn("status")?.setFilterValue("");
              setCurrentPage(1);
            }}
          >
            Clear
          </button>
        )}
      </div>
      <Table id="table-el">
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
                          header.getContext()
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
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {table.getPageCount() > 1 && (
        <div className="pagination-controls">
          <button
            onClick={() => {
              table.previousPage();
              setCurrentPage(currentPage - 1);
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Prev
          </button>
          <span>
            <strong>
              {currentPage} of {table.getPageCount()}
            </strong>
          </span>
          <button
            onClick={() => {
              table.nextPage();
              setCurrentPage(currentPage + 1);
            }}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
