"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import index from '../../pages/Home';

export type UpcomingShipments = {
    id: string;
    name: string;
    status: "shipped" | "pending" | "cancelled";
    address: string;
};

export const columns: ColumnDef<UpcomingShipments>[] = [
    {
        header: "ID",
        accessorKey: "id"
    },
    {
        header: "Name",
        accessorKey: "name"
    },
    {
        header: "Status",
        accessorKey: "status"
    },
    {
        header: "Address",
        accessorKey: "address"
    },
]; 