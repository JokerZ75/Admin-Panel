import React, { useMemo, useState } from "react";
import { Layout, Graph } from "../components";
import { columns, Order} from '../components/OrdersTable/columns';
import { DataTable } from "../components/OrdersTable/data-table";
import useEffect from 'react';
import Orders from './Orders';


async function getOrders():Promise<Order[]> {

  return [
      {
          id: "1",
          name: "John Doe",
          email: "johnDoe@email.com",
          address: "1234 Main St",
          status: "success",
          amount: 100
      },
      {
          id: "2",
          name: "Jane Doe",
          email: "janeDoe@email.com",
          address: "1234 Main St",
          status: "pending",
          amount: 100
      },
      {
          id: "3",
          name: "John Smith",
          email: "smith@email.com",
          address: "1234 Main St",
          status: "cancelled",
          amount: 100
      }
  ]
}


const index = () => {
  const [data , setData] = useState<Order[]>([]);
  useMemo(() => 
    getOrders().then((orders:Order[]) => setData(orders)),
   []);

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
              <Graph  />
            </div>
          </div>
          <div className="card table">
            <div className="card-heading">
              <h2>Recent Orders</h2>
            </div>
            <div className="card-body-table">
              <DataTable columns={columns} data={data} />
            </div>
          </div>
          <div className="card">
            <div className="card-heading">
              <h2>Upcoming Shipments</h2>
            </div>
            <div className="card-body-table"></div>
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
