import React, { useState } from 'react';
import { Link } from '../Links';
const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
        <button><Link to="/dashboard">Home</Link></button>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Buscar..."
      />
        
        <button onClick={handleSearch}>Buscar</button>
        
    </div>
  );
};

export default Search;
