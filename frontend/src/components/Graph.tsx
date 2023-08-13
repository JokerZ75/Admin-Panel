import React, { FC } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Legend
} from "recharts";

interface graphProps {
  dataS?: any;
}

const Graph: FC<graphProps> = ({ dataS }) => {
  const data = [
    {
        name: "Jan",
        uv: 4000,
    },
    {
        name: "Feb",
        uv: 3000,
    },
    {
        name: "Mar",
        uv: 2000,
    },
    {
        name: "Apr",
        uv: 2780,
    },
    {
        name: "May",
        uv: 1890,
    },
    {
        name: "Jun",
        uv: 2390,
    },
    {
        name: "Jul",
        uv: 3490,
    },
    {
        name: "Aug",
        uv: 4000,
    },
    {
        name: "Sep",
        uv: 3000,
    },
    {
        name: "Oct",
        uv: 2000,
    },
    {
        name: "Nov",
        uv: 2780,
    },
    {
        name: "Dec",
        uv: 1890,
    },
  ];

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
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
            </defs>
          <XAxis id="XAxis" dataKey="name" color="#ffffff" opacity={1} />
          <YAxis id="YAxis"/>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
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
