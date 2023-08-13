import React, { useMemo, useState } from "react";
import { Graph } from "../components";
import {
  columns,
  RecentOrder,
} from "../components/Data-table-Columns/RecentOrders";
import {
  UpcomingShipments,
  columns as upcomingShipmentsColumns,
} from "../components/Data-table-Columns/UpcomingShipments";
import { DataTable } from "../components/ui/data-table-shipmentOrder";
import Cards from "../components/ui/Card";

async function getOrders(): Promise<RecentOrder[]> {
  return [
    {
      id: "1",
      name: "John Doe",
      status: "success",
      amount: 100,
    },
    {
      id: "2",
      name: "Jane Doe",
      status: "pending",
      amount: 100,
    },
    {
      id: "3",
      name: "John Smith",
      status: "cancelled",
      amount: 100,
    },
    {
      id: "4",
      name: "Jane Smith",
      status: "success",
      amount: 100,
    },
    {
      id: "5",
      name: "John Doe",
      status: "success",
      amount: 100,
    },
    {
      id: "6",
      name: "Jane Doe",
      status: "pending",
      amount: 100,
    },
    {
      id: "7",
      name: "John Smith",
      status: "cancelled",
      amount: 100,
    },
    {
      id: "8",
      name: "Jane Smith",
      status: "success",
      amount: 100,
    },
    {
      id: "9",

      name: "John Doe",
      status: "success",
      amount: 100,
    },
    {
      id: "10",
      name: "Jane Doe",
      status: "pending",
      amount: 100,
    },
  ];
}

async function getUpcomingShipments(): Promise<UpcomingShipments[]> {
  return [
    {
      id: "1",
      name: "John Doe",
      status: "shipped",
      address: "123 Fake Street",
    },
    {
      id: "2",
      name: "Jane Doe",
      status: "pending",
      address: "123 Fake Street",
    },
  ];
}

const index = () => {
  const [data, setData] = useState<RecentOrder[]>([]);
  const [UpcomingShipments, setUpcomingShipments] = useState<
    UpcomingShipments[]
  >([]);
  useMemo(() => {
    getOrders().then((orders: RecentOrder[]) => setData(orders));
    getUpcomingShipments().then((shipments: UpcomingShipments[]) =>
      setUpcomingShipments(shipments)
    );
  }, []);

  return (
    <>
      <div id="main-content-container">
        <div id="heading">
          <h1>Dashboard</h1>
        </div>
        <Cards>
          <div id="Graph" title="Sales Graph">
            <Graph />
          </div>
          <div title="Recent Orders">
            <DataTable columns={columns} data={data} type="order" />
          </div>
          <div title="Upcoming Shipments">
            <DataTable columns={upcomingShipmentsColumns} data={UpcomingShipments} type="shipment" />
          </div>
          <div title="Total Money In"></div>
          <div title="Total Orders"></div>
          <div title="Best Seller"></div>
        </Cards>
      </div>
    </>
  );
};

export default index;
