import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const PieChartComponent = ({ sshCount, httpCount }) => {
  const data = [
    { name: 'SSH Attacks', value: sshCount },
    { name: 'HTTP Requests', value: httpCount },
  ];

  const COLORS = ['#FF5733', '#4285F4'];

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Attack Distribution</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx={200}
          cy={150}
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
