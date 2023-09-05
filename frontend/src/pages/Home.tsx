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


const index = () => {
  const { data, isError } = useQuery({
    queryKey: ["orders"],
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
            {(data && (
              <DataTable columns={columns} data={data} type="order" />
            )) || <p>Loading...</p>}
            {isError && <p>There was an error fetching the data please try again later...</p>}
          </Card>
        </Cards>
      </div>
    </>
  );
};

export default index;
