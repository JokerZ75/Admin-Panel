import React from "react";
import { Layout } from "../components";

const index = () => {
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
            <div className="card-body-graph"></div>
          </div>
          <div className="card table">
            <div className="card-heading">
              <h2>Recent Orders</h2>
            </div>
            <div className="card-body-table"></div>
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
