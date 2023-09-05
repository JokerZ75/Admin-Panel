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
import useEffect from 'react';

interface Product {
  item: string;
  quantity: number;
  amount: number;
}

const index = () => {
  const { data, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:8008/orders");
      let products = await data.flatMap((order: RecentOrder) => {
        return order.products
      });
      setProducts(products);
      return data as RecentOrder[];
    },
  });



  const [products, setProducts] = useState<Product[]>([]);
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
    }
    );
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
            {(data && (
              <p className="card-text-large">
                {bestSeller}
              </p>
            )) || <p>Loading...</p>}
          </Card>
          <Card bodyID="Graph" id="sales-graph" title="Sales Graph">
            <Graph />
          </Card>
          <Card title="Recent Orders">
            {(data && (
              <DataTable columns={columns} data={data} type="order" />
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
