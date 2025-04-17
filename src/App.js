import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SSHLogs from './components/SSHLogs';
import HTTPLogs from './components/HTTPLogs';
import Dashboard from './components/Dashboard';
import ReportPage from './components/ReportPage';

const App = () => {
    return (
        <Router>
            <div className="p-4">
                <nav className="mb-4">
                    <Link to="/" className='mr-4 text-blue-500'>Dashboard</Link>
                    <Link to="/ssh-logs" className="mr-4 text-blue-500">SSH Logs</Link>
                    <Link to="/http-logs" className="mr-4 text-blue-500">HTTP Logs</Link>
                    <Link to="/report" className="text-blue-500">Analyze</Link>

                    
                </nav>

                <Routes>
                    <Route path="/ssh-logs" element={<SSHLogs />} />
                    <Route path="/http-logs" element={<HTTPLogs />} />
                    <Route path="/" element={<Dashboard/>} />
                    <Route path="/report" element={<ReportPage />} />

                </Routes>
            </div>
        </Router>
    );
};

export default App;
