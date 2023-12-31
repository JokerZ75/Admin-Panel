"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { randomInt } from "crypto";

export type Order = {
  createdAt: string | number | Date;
  _id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  products: Array<Array<string>>;
  amount: number;
  status: "Success" | "Pending" | "Cancelled";
  shipped: "Shipped" | "Pending";
};

export const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: "Selection",
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "_id",
    header: "Order ID",
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
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "products",
    header: () => <div className="text-right">Products</div>,
    cell: ({ row }) => {
      const products: Array<Array<string>> = row.getValue("products");
      return products.map((product: any) => {
        return <div key={(product.quantity * Math.random())} className="text-right font-medium">{product.quantity}x {product.item}</div>;
      });
    },
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
    accessorKey: "shipped",
    header: "Shipped",
  },
];
