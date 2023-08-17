"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";

export type Order = {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  products: string;
  amount: number;
  status: "success" | "pending" | "cancelled";
  shipped: "shipped" | "pending";
};

export const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: "Selection",
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value:any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    accessorKey: "Address",
    header: "Address",
  },
  {
    accessorKey: "Phone",
    header: "Phone",
  },
  {
    accessorKey: "Products",
    header: "Products",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "gbp",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "Shipped",
    header: "Shipped",
  },
];
