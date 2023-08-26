"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMediaQuery } from "@mui/material";
import React from "react";
import { Input } from "./ui/input";
import { Order } from "./Data-table-Columns/OrdersPage";
import index from '../pages/Home';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setRow: React.Dispatch<React.SetStateAction<Order>>;
}

function DataTable<TData, TValue>({
  columns,
  data,
  setRow,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,

    state: {
      columnFilters,
      rowSelection,
    },

    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
  });

  const [previousRow, setPreviousRow] = React.useState<any>(null);

  React.useEffect(() => {
    const rows = table.getRowModel().rows;
    const selectedRows = rows.filter((row) => row.getIsSelected());
    console.log(selectedRows);
    if (selectedRows.length === 1) {
      setPreviousRow(selectedRows[0]);
      setRow(selectedRows[0]._valuesCache as Order);
    } else if (selectedRows.length > 1) {
      previousRow.toggleSelected();
    } 
    else {
      setRow({} as Order);
    }
  }, [rowSelection, previousRow]);

  const [currentPage, setCurrentPage] = React.useState(1);

  const isMobile = useMediaQuery("(max-width: 768px)");

  React.useEffect(() => {
    if (isMobile) {
      table.setPageSize(4);
    } else {
      table.setPageSize(8);
    }
  }, [isMobile]);

  const clearRowSelection = () => {
    const selectedRows = table
      .getRowModel()
      .rows.filter((row) => row.getIsSelected());
    selectedRows.forEach((row) => row.toggleSelected());
    setRow({} as Order);
  };

  return (
    <div className="rounded-xl m-1 border">
      <div className="flex items-center ml-2 py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="w-max"
        />
        {table.getRowModel().rows?.filter((row) => row.getIsSelected()).length >
          0 && (
          <div className="ml-auto mr-8 filter-input">
            <button onClick={() => clearRowSelection()}>Clear Select</button>
          </div>
        )}
      </div>
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

export { DataTable };
