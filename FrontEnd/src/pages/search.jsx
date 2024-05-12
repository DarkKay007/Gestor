import React, { useState } from "react";
import DashboardNav from "./components/dashboard-nav";
const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Kuro</h1>
      </header>
      <nav className="dashboard-nav">
        <DashboardNav />
      </nav>
      <main className="dashboard-main">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar..."
        />
        <button onClick={handleSearch}>Buscar</button>
      </main>
    </div>
  );
};

export default Search;
