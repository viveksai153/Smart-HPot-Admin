const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
      <input
        type="text"
        placeholder="Search logs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
      />
    );
  };
  
  export default SearchBar;
  