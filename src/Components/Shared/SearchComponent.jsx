/* eslint-disable react/prop-types */
import { useState } from "react";

const SearchComponent = ({ items }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredResults = items.filter((item) =>
      item.name.toLowerCase()
    .includes(query.toLowerCase())
  );
  setSearchResults(filteredResults);
};

return (
  <div className="my-6">
    <input
      type="text"
      placeholder="Search by product title..."
      value={searchQuery}
      onChange={(e) => handleSearch(e.target.value)}
      className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
    />
    <div className="mt-2">
      {searchResults.length === 0 ? (
        <p className="text-gray-500">No results found.</p>
      ) : (
        searchResults.map((result) => (
          <div key={result._id} className="border-b py-2">
              <h3 className="text-lg font-semibold">{result.name}</h3>
            <p className="text-sm text-gray-600">{result.description}</p>
          </div>
        ))
      )}
    </div>
  </div>
);
};

export default SearchComponent;