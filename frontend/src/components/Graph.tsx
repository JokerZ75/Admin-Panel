import React, { FC } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Legend,
} from "recharts";

interface graphProps {
  data?: {
    name: string;
    sales: number;
  }[];
}

const Graph: FC<graphProps> = ({ data }) => {
  return (
    <>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 0,
          }}
        >
          <Legend verticalAlign="top" height={38} />
          <defs>
            <linearGradient id="colorLine" x1={0} y1={0} x2={0} y2={1}>
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis id="XAxis" dataKey="name" color="#ffffff" opacity={1} />
          <YAxis id="YAxis" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorLine)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default Graph;
