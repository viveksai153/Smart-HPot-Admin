import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SummaryCards from './SummaryCards';
import SSHChart from './SSHChart';
import HTTPChart from './HTTPChart';
import LogsTable from './LogsTable';
import Alerts from './Alerts';

const API_BASE_URL = " https://f380-103-95-173-158.ngrok-free.app";

const Dashboard = () => {
  const [sshLogs, setSshLogs] = useState([]);
  const [httpLogs, setHttpLogs] = useState([]);
  const [sshCount, setSshCount] = useState(0);
  const [httpCount, setHttpCount] = useState(0);
  const [suspiciousIPs, setSuspiciousIPs] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState(null);

  // ====================[ Fetch Logs from API ]====================
  const fetchData = async () => {
    try {
      setError(null); // Reset error state before fetching
      
      const [sshResponse, httpResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/logs/ssh`, { headers: { 'ngrok-skip-browser-warning': 'true' } }),
        axios.get(`${API_BASE_URL}/logs/http`, { headers: { 'ngrok-skip-browser-warning': 'true' } })
      ]);

      if (!Array.isArray(sshResponse.data) || !Array.isArray(httpResponse.data)) {
        throw new Error("Invalid API response format.");
      }

      setSshLogs(sshResponse.data);
      setHttpLogs(httpResponse.data);
      setSshCount(sshResponse.data.length);
      setHttpCount(httpResponse.data.length);

      detectSuspiciousActivity([...sshResponse.data, ...httpResponse.data]);
    } catch (err) {
      console.error("Error fetching logs:", err);
      setError("Failed to fetch logs. Please check the API or your internet connection.");
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  // ====================[ Detect Suspicious Activity ]====================
  const detectSuspiciousActivity = (logs) => {
    const activityMap = {};
    const suspicious = new Set();

    logs.forEach(log => {
      if (!activityMap[log.ip]) {
        activityMap[log.ip] = [];
      }
      activityMap[log.ip].push(new Date(log.timestamp).getTime());

      if (activityMap[log.ip].length > 3) {
        const recentAttempts = activityMap[log.ip].slice(-3);
        if (recentAttempts[2] - recentAttempts[0] <= 30000) {
          suspicious.add(log.ip);
        }
      }
    });

    setSuspiciousIPs(Array.from(suspicious));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-indigo-700">
          Smart-HPot Dashboard
        </h1>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-500 text-white rounded">
          {error}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-6 py-2 rounded-md transition duration-300 ${
            activeTab === 'overview' 
              ? 'bg-indigo-700 text-white shadow-lg' 
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('alerts')}
          className={`px-6 py-2 rounded-md transition duration-300 ${
            activeTab === 'alerts' 
              ? 'bg-red-500 text-white shadow-lg' 
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
        >
          Alerts
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' ? (
        <>
          {/* Summary Cards */}
          <SummaryCards
            sshCount={sshCount}
            httpCount={httpCount}
            uniqueIPs={new Set([
              ...sshLogs.map(log => log.ip),
              ...httpLogs.map(log => log.ip)
            ]).size}
          />

          {/* SSH and HTTP Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <SSHChart 
              data={sshLogs.map(log => ({
                time: new Date(log.timestamp).toLocaleTimeString(),
                attempts: 1
              }))}
            />
            <HTTPChart 
              data={httpLogs.map(log => ({
                time: new Date(log.timestamp).toLocaleTimeString(),
                requests: 1
              }))}
            />
          </div>

          {/* Logs Table */}
          <div className="mt-6">
            <LogsTable logs={[...sshLogs, ...httpLogs]} />
          </div>
        </>
      ) : (
        // Alerts Tab
        <Alerts suspiciousIPs={suspiciousIPs} />
      )}
    </div>
  );
};

export default Dashboard;
