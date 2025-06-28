import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import CustomTooltip from "./CustomToolTip";

type Props = {
  data: {
    age_group: string;
    male: number;
    female: number;
  }[];
};

export default function DemographicsChart({ data }: Props) {

    console.log(data)
  return (
    
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" tickFormatter={(val)=> `${Math.abs(val)}`}/>
        <YAxis dataKey="age_group" type="category" />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="male" fill="#8884d8" stackId="a" data-testid="bar-segment"/>
        <Bar dataKey="offset" fill="transparent" stackId="a" />
        <Bar dataKey="female" fill="#82ca9d" stackId="a" data-testid="bar-segment"/>
      </BarChart>
    </ResponsiveContainer>
  );
}
