import React, { useMemo, useState } from "react";
import { Graph } from "../components";
import {
  columns,
  RecentOrder,
} from "../components/Data-table-Columns/RecentOrders";
import { DataTable } from "../components/ui/data-table";
import { Cards, Card } from "../components/ui/Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { json } from "stream/consumers";

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
  const [dataS, setData] = useState<RecentOrder[]>([]);
  useMemo(() => {
    getOrders().then((orders: RecentOrder[]) => setData(orders));
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:8008/orders");
      console.log(data as RecentOrder[]);
      return data as RecentOrder[];
    },
  });

  return (
    <>
      <div id="main-content-container">
        <div id="heading">
          <h1>Dashboard</h1>
        </div>
        <Cards>
          <Card cardClass="smaller-card" title="Total Money In">
            <p className="card-text-large">£2000</p>
          </Card>
          <Card cardClass="smaller-card" title="Total Orders">
            <p className="card-text-large">4000</p>
          </Card>
          <Card cardClass="smaller-card" title="Best Seller">
            <p className="card-text-large">Product 1</p>
          </Card>
          <Card bodyID="Graph" id="sales-graph" title="Sales Graph">
            <Graph />
          </Card>
          <Card title="Recent Orders">
            <DataTable columns={columns} data={dataS} type="order" />
          </Card>
          <Card title="test">
            {
              data?.map((order: RecentOrder) => {
                return (
                  <div>
                    <p>{order_id}</p>
                  </div>
                );
              })
            }
          </Card>
        </Cards>
      </div>
    </>
  );
};

export default index;
