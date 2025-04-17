import { Table, TableHeader, TableRow, TableCell } from "./ui/table";

const LogsTable = ({ logs }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>IP</TableCell>
          <TableCell>Method</TableCell>
          <TableCell>Username</TableCell>
          <TableCell>Timestamp</TableCell>
        </TableRow>
      </TableHeader>
      {logs.map((log, index) => (
        <TableRow key={index}>
          <TableCell>{log.ip}</TableCell>
          <TableCell>{log.method || "N/A"}</TableCell>
          <TableCell>{log.username || "N/A"}</TableCell>
          <TableCell>{new Date(log.timestamp).toLocaleTimeString()}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
};

export default LogsTable;
