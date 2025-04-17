import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SSHChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="attempts" stroke="#4F46E5" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SSHChart;
