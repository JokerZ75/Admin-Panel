import Cards from "@/components/ui/Card";
import React, { useMemo, useState } from "react";
import {
  columns,
  Order,
} from "../components/Data-table-Columns/OrdersPage";
import { DataTable } from "../components/ui/data-table";

async function getOrders(): Promise<Order[]> {
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

const Orders = () => {
  const [data, setData] = useState<Order[]>([]);
  useMemo(() => {
    getOrders().then((orders: Order[]) => setData(orders));
  }, []);

  React.useEffect(() => {}, [data]);

  return (
    <>
      <div id="main-content-container">
        <div id="heading">
          <h1>Orders</h1>
        </div>
        <Cards>
          <div title="Orders In last 30 days">
            <p className="card-text-large">+ 2000</p>
          </div>
          <div title="Total Orders">
            <p className="card-text-large">4000</p>
          </div>
          <div title="Orders Shipped">
            <p className="card-text-large">3750</p>
          </div>
          <div title="Create Order">
            <p className="card-text">
              <form id="order-form">
                <div>
                  <label htmlFor="id">ID</label>
                  <input type="text" name="id" id="id" placeholder="1" />
                </div>
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="John@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="22 Combine St"
                  />
                </div>
                <div>
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="07575 39281"
                  />
                </div>
                <div>
                  <label htmlFor="products">Products</label>
                  <input
                    type="text"
                    name="products"
                    id="products"
                    placeholder="2x Eggs, 3x Item"
                  />
                </div>
                <div>
                  <label htmlFor="Amount">Amount</label>
                  <input
                    type="number"
                    name="Amount"
                    id="Amount"
                    placeholder="£200"
                  />
                </div>
                <div>
                  <label htmlFor="status">Status</label>
                  <select name="status" id="status">
                    <option value="success">Success</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="shipped">Shipped</label>
                  <select name="shipped" id="shipped">
                    <option value="yes">shipped</option>
                    <option value="no">pending</option>
                  </select>
                </div>
                <input type="submit" />
              </form>
            </p>
          </div>
          <div title="Orders">
            <DataTable columns={columns} data={data} type="order" />
          </div>
        </Cards>
      </div>
    </>
  );
};

export default Orders;
