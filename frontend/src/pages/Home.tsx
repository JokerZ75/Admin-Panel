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
        <div id="cards-holder">
          <div className="card">
            <div className="card-heading">
              <h2>Sales Graph</h2>
            </div>
            <div className="card-body-graph">
              <Graph />
            </div>
          </div>
          <div className="card">
            <div className="card-heading">
              <h2>Recent Orders</h2>
            </div>
            <div className="card-body-table">
              <DataTable type="order" columns={columns} data={data} />
            </div>
          </div>
          <div className="card">
            <div className="card-heading">
              <h2>Upcoming Shipments</h2>
            </div>
            <div className="card-body-table">
              <DataTable
                type="shipment"
                columns={upcomingShipmentsColumns}
                data={UpcomingShipments}
              />
            </div>
          </div>
          <div id="money-in" className="card">
            <div className="card-heading">
              <h2>Total Money In</h2>
            </div>
            <div className="card-body"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
