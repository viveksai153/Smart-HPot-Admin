import { Card, CardContent } from "./ui/card";

const SummaryCards = ({ sshCount, httpCount, uniqueIPs }) => {
  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      <Card>
        <CardContent>
          <h2 className="text-md font-semibold">Total SSH Attempts</h2>
          <p className="text-3xl font-bold">{sshCount}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2 className="text-md font-semibold">Total HTTP Requests</h2>
          <p className="text-3xl font-bold">{httpCount}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2 className="text-md font-semibold">Unique IPs</h2>
          <p className="text-3xl font-bold">{uniqueIPs}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
