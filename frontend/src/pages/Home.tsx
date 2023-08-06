import React from "react";
import { Layout } from "../components";

const index = () => {
  return (
      <div>
        <div id="heading">
          <h1>Dashboard</h1>
        </div>
        <div id="content">
          <div className="grid-container">
            <div className="grid-item">
              <h2>Users</h2>
              <p>100</p>
            </div>
            <div className="grid-item">
              <h2>Products</h2>
              <p>100</p>
            </div>
            <div className="grid-item">
              <h2>Orders</h2>
              <p>100</p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default index;
