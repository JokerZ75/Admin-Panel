"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";

export type Order = {
    id: string;
    name: string;
    email: string;
    address: string;
    status: "success" | "pending" | "cancelled";
    amount: number;
};

export const columns: ColumnDef<Order>[] = [
    {
        header: "ID",
        accessorKey: "id"
    },
    {
        header: "Name",
        accessorKey: "name"
    },
    {
        header: "Email",
        accessorKey: "email"
    },
    {
        header: "Address",
        accessorKey: "address"
    },
    {
        header: "Status",
        accessorKey: "status"
    },
    {
        header: "Amount",
        accessorKey: "amount"
    }
]; 

