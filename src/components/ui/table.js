const Table = ({ children }) => (
    <table className="min-w-full divide-y divide-gray-200">{children}</table>
  )
  
  const TableHeader = ({ children }) => (
    <thead className="bg-gray-50">{children}</thead>
  )
  
  const TableRow = ({ children }) => (
    <tr className="hover:bg-gray-100">{children}</tr>
  )
  
  const TableCell = ({ children }) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{children}</td>
  )
  
  export { Table, TableHeader, TableRow, TableCell }
  