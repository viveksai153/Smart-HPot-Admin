import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HTTPChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Scatter data={data} fill="#34D399" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default HTTPChart;
