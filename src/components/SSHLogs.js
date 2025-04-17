import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = ' https://f380-103-95-173-158.ngrok-free.app/logs';

const SSHLogs = () => {
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/ssh`, {
                    headers: {
                        'ngrok-skip-browser-warning': 'true',
                        'Content-Type': 'application/json',
                    },
                     
                });

                setLogs(response.data);
                setFilteredLogs(response.data);
            } catch (error) {
                console.error('Error fetching SSH logs:', error);
            }
        };

        fetchLogs();
    }, []);

    // Filter logs based on search query
    useEffect(() => {
        const query = searchQuery.toLowerCase();
        const filtered = logs.filter(
            (log) =>
                log.id.toString().includes(query) ||
                log.ip.toLowerCase().includes(query) ||
                log.username?.toLowerCase().includes(query) ||
                log.password?.toLowerCase().includes(query) ||
                log.command?.toLowerCase().includes(query) ||
                new Date(log.timestamp).toLocaleString().toLowerCase().includes(query)
        );
        setFilteredLogs(filtered);
    }, [searchQuery, logs]);

    // Convert logs to CSV and download
    const downloadCSV = () => {
        if (filteredLogs.length === 0) return;

        const header = 'ID,Command,IP,Username,Password,Timestamp\n';
        const rows = filteredLogs.map(log =>
            `${log.id},"${log.command || 'N/A'}",${log.ip},"${log.username || 'N/A'}","${log.password || 'N/A'}","${new Date(log.timestamp).toLocaleString()}"`
        ).join('\n');

        const csvContent = header + rows;
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'ssh_logs.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
            {/* Title and Actions */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    SSH Logs
                </h2>
                <div className="flex gap-4">
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search logs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                    {/* Download CSV Button */}
                    <button
                        onClick={downloadCSV}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition"
                    >
                        Download CSV
                    </button>
                </div>
            </div>

            {/* Logs Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg">
                    <thead>
                        <tr className="bg-blue-500 dark:bg-blue-700 text-white">
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Command</th>
                            <th className="border px-4 py-2">IP</th>
                            <th className="border px-4 py-2">Username</th>
                            <th className="border px-4 py-2">Password</th>
                            <th className="border px-4 py-2">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLogs.length > 0 ? (
                            filteredLogs.map((log) => (
                                <tr
                                    key={log.id}
                                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <td className="border px-4 py-2 text-center text-gray-800 dark:text-white">
                                        {log.id}
                                    </td>
                                    <td className="border px-4 py-2 text-center text-gray-800 dark:text-white">
                                        {log.command || 'N/A'}
                                    </td>
                                    <td className="border px-4 py-2 text-center text-gray-800 dark:text-white">
                                        {log.ip}
                                    </td>
                                    <td className="border px-4 py-2 text-center text-gray-800 dark:text-white">
                                        {log.username || 'N/A'}
                                    </td>
                                    <td className="border px-4 py-2 text-center text-gray-800 dark:text-white">
                                        {log.password || 'N/A'}
                                    </td>
                                    <td className="border px-4 py-2 text-center text-gray-800 dark:text-white">
                                        {new Date(log.timestamp).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center text-gray-500 dark:text-gray-400 py-4"
                                >
                                    🚫 No data found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SSHLogs;
