const LogTable = ({ logs, searchTerm }) => {
  const filteredLogs = logs.filter(
    (log) =>
      log.ip.includes(searchTerm) ||
      log.method?.includes(searchTerm) ||
      log.protocol?.includes(searchTerm)
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 shadow-md">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="border border-gray-300 p-2">IP Address</th>
            <th className="border border-gray-300 p-2">Method</th>
            <th className="border border-gray-300 p-2">Protocol</th>
            <th className="border border-gray-300 p-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="border border-gray-300 p-2">{log.ip}</td>
              <td className="border border-gray-300 p-2">{log.method}</td>
              <td className="border border-gray-300 p-2">{log.protocol}</td>
              <td className="border border-gray-300 p-2">{log.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogTable;
