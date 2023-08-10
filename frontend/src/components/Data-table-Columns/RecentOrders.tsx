"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";

export type RecentOrder = {
  id: string;
  name: string;
  status: "success" | "pending" | "cancelled";
  amount: number;
};

export const columns: ColumnDef<RecentOrder>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    accessorKey: "status",
    header: "Status",
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
];