import { useState } from 'react';

const DateFilter = ({ setDateRange }) => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleFilter = () => {
    setDateRange({ start, end });
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="date"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="date"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        onClick={handleFilter}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Apply
      </button>
    </div>
  );
};

export default DateFilter;
