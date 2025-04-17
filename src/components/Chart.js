import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Chart = ({ logs }) => {
  const processData = () => {
    const countByDate = logs.reduce((acc, log) => {
      const date = new Date(log.timestamp).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(countByDate).map(date => ({
      date,
      attacks: countByDate[date]
    }));
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Attack Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={processData()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="attacks" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
