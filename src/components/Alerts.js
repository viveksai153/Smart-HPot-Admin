const Alerts = ({ suspiciousIPs }) => {
    return (
      <div>
        <h2 className="text-md font-semibold mb-2">Suspicious Activity</h2>
        {suspiciousIPs.length === 0 ? (
          <p>No suspicious activity detected.</p>
        ) : (
          suspiciousIPs.map(ip => (
            <div key={ip} className="mb-2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg shadow">
              🚨 Suspicious activity from IP: {ip}
            </div>
          ))
        )}
      </div>
    );
  };
  
  export default Alerts;
  