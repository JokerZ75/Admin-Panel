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
import { set } from "react-hook-form";
import useEffect from "react";

interface Product {
  item: string;
  quantity: number;
  amount: number;
}

const index = () => {
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const { data, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:8008/orders");
      let products = await data.flatMap((order: RecentOrder) => {
        return order.products;
      });

     let RecentOrders = await data.filter((order: RecentOrder) => {
        return (
          new Date(order.createdAt) <
            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) &&
          new Date(order.createdAt) >
            new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        );
      });

      let monthMap = new Map<string, number>();
      await data.forEach((order: RecentOrder) => {
        let month = new Date(order.createdAt).getMonth().toString();
        month = months[parseInt(month)];
        if (monthMap.has(month)) {
          monthMap.set(month, monthMap.get(month)! + 1);
        } else {
          monthMap.set(month, 1);
        }
      });
      let graphData: Array<{
        name: string;
        sales: number;
      }> = [];
      monthMap.forEach((value: number, key: string) => {
        graphData.push({ name: key, sales: value });
      });

      setGraphData(graphData);
      setRecentOrders(RecentOrders);
      setProducts(products);
      return data as RecentOrder[];
    },
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [graphData, setGraphData] = useState<any[]>([]);
  const [bestSeller, setBestSeller] = useState<string>("");

  React.useEffect(() => {
    let quantityTracker = new Map<string, number>();
    products.forEach((product: Product) => {
      if (quantityTracker.has(product.item)) {
        quantityTracker.set(
          product.item,
          quantityTracker.get(product.item)! + product.quantity
        );
      } else {
        quantityTracker.set(product.item, product.quantity);
      }
    });
    let max = 0;
    let bestSeller = "";
    quantityTracker.forEach((value: number, key: string) => {
      if (value > max) {
        max = value;
        bestSeller = key;
      }
    });
    setBestSeller(bestSeller);
  }, [products]);

  return (
    <>
      <div id="main-content-container">
        <div id="heading">
          <h1>Dashboard</h1>
        </div>
        <Cards>
          <Card cardClass="smaller-card" title="Total Money In">
            {(data && (
              <p className="card-text-large">
                £
                {data
                  .map((order: RecentOrder) => order.amount)
                  .reduce((a: number, b: number) => a + b, 0)}
              </p>
            )) || <p>Loading...</p>}
          </Card>
          <Card cardClass="smaller-card" title="Total Orders">
            {(data && <p className="card-text-large">{data?.length}</p>) || (
              <p>Loading...</p>
            )}
          </Card>
          <Card cardClass="smaller-card" title="Best Seller">
            {(data && <p className="card-text-large">{bestSeller}</p>) || (
              <p>Loading...</p>
            )}
          </Card>
          <Card bodyID="Graph" id="sales-graph" title="Sales Graph">
            <Graph data={graphData} />
          </Card>
          <Card title="Recent Orders">
            {(data && (
              <DataTable columns={columns} data={recentOrders} type="order" />
            )) || <p>Loading...</p>}
            {isError && (
              <p>
                There was an error fetching the data please try again later...
              </p>
            )}
          </Card>
        </Cards>
      </div>
    </>
  );
};

export default index;
