import React, { useState } from "react";
import axios from "axios";

const ReportPage = () => {
  const [logs, setLogs] = useState([]);
  const [summary, setSummary] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const headers = { "ngrok-skip-browser-warning": "true" };

      const sshResponse = await axios.get(
        "https://f380-103-95-173-158.ngrok-free.app/logs/ssh",
        { headers }
      );
      const httpResponse = await axios.get(
        "https://f380-103-95-173-158.ngrok-free.app/logs/http",
        { headers }
      );

      if (!Array.isArray(sshResponse.data) || !Array.isArray(httpResponse.data)) {
        throw new Error("Invalid response format. Expected an array.");
      }

      const sshLogs = sshResponse.data.map((log) => ({
        id: log.id,
        ip: log.ip,
        type: "SSH",
        data: `User: ${log.username}, Pass: ${log.password}`,
        timestamp: log.timestamp,
      }));

      const httpLogs = httpResponse.data.map((log) => ({
        id: log.id,
        ip: log.ip,
        type: "HTTP",
        data: `Method: ${log.method}, Path: ${log.request_path}`,
        timestamp: log.timestamp,
      }));

      const allLogs = [...sshLogs, ...httpLogs];
      setLogs(allLogs);
      generateSummary(sshLogs, httpLogs);
    } catch (error) {
      console.error("Error fetching logs:", error);
      alert("Failed to fetch logs. Check console for details.");
    }
    setLoading(false);
  };

  const generateSummary = (sshLogs, httpLogs) => {
    const uniqueIPs = new Set([...sshLogs, ...httpLogs].map((log) => log.ip));

    setSummary({
      totalSSH: sshLogs.length,
      totalHTTP: httpLogs.length,
      totalLogs: sshLogs.length + httpLogs.length,
      uniqueIPs: uniqueIPs.size,
      mostCommonAttack:
        sshLogs.length > httpLogs.length ? "SSH Brute Force" : "HTTP Scanning",
    });
  };

  const exportToCSV = () => {
    const csvContent = [
      ["IP", "Type", "Data", "Timestamp"],
      ...logs.map((log) => [log.ip, log.type, log.data || "N/A", log.timestamp]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(logs, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "report.json");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-indigo-700 mb-4">Generate Report</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded shadow"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded shadow"
        />
        <button
          onClick={fetchLogs}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Loading..." : "Generate"}
        </button>
      </div>

      {/* Report Summary */}
      {logs.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Report Summary</h3>
          <p><strong>Total Logs:</strong> {summary.totalLogs}</p>
          <p><strong>Total SSH Attempts:</strong> {summary.totalSSH}</p>
          <p><strong>Total HTTP Requests:</strong> {summary.totalHTTP}</p>
          <p><strong>Unique IPs:</strong> {summary.uniqueIPs}</p>
          <p><strong>Most Common Attack:</strong> {summary.mostCommonAttack}</p>
        </div>
      )}

      {/* Report Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">IP</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Data</th>
              <th className="border px-4 py-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{log.ip}</td>
                <td className="border px-4 py-2">{log.type}</td>
                <td className="border px-4 py-2">{log.data}</td>
                <td className="border px-4 py-2">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={exportToCSV}
          className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
        >
          Export to CSV
        </button>
        <button
          onClick={exportToJSON}
          className="bg-indigo-500 text-white px-4 py-2 rounded shadow hover:bg-indigo-600"
        >
          Export to JSON
        </button>
      </div>
    </div>
  );
};

export default ReportPage;
