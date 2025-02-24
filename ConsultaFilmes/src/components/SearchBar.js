import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-full rounded"
        placeholder="Digite o nome do filme..."
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;