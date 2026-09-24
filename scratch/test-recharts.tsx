import React from "react";
import { PieChart, Pie, Label, ResponsiveContainer } from "recharts";
import { renderToString } from "react-dom/server";

const data = [{ name: "A", value: 100 }];

const content = (props: any) => {
  console.log("PROPS:", JSON.stringify(props.viewBox));
  return <text>Hi</text>;
};

const Test = () => (
  <PieChart width={400} height={400}>
    <Pie data={data} innerRadius={60} outerRadius={80} cx="50%" cy="50%">
      <Label content={content} position="center" />
    </Pie>
  </PieChart>
);

renderToString(<Test />);
