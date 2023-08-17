import React, { useMemo, useState } from "react";
import { Graph } from "../components";
import {
  columns,
  RecentOrder,
} from "../components/Data-table-Columns/RecentOrders";
import { DataTable } from "../components/ui/data-table";
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

const index = () => {
  const [data, setData] = useState<RecentOrder[]>([]);
  useMemo(() => {
    getOrders().then((orders: RecentOrder[]) => setData(orders));
  }, []);


  return (
    <>
      <div id="main-content-container">
        <div id="heading">
          <h1>Dashboard</h1>
        </div>
        <Cards>
          <div title="Total Money In">
            <p className="card-text-large">£2000</p>
          </div>
          <div title="Total Orders">
            <p className="card-text-large">4000</p>
          </div>
          <div title="Best Seller">
            <p className="card-text-large">Product 1</p>
            <img src="" alt="image of product" />
          </div>
          <div id="Graph" title="Sales Graph">
            <Graph />
          </div>
          <div title="Recent Orders">
            <DataTable columns={columns} data={data} type="order" />
          </div>
        </Cards>
      </div>
    </>
  );
};

export default index;
