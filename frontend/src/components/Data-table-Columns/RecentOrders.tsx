"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";

export type RecentOrder = {
  _id: string;
  name: string;
  products: Array<Array<string>>;
  status: "Success" | "Pending" | "Cancelled";
  amount: number;
  createdAt: Date;
};

export const columns: ColumnDef<RecentOrder>[] = [
  {
    header: "ID",
    accessorKey: "_id",
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
