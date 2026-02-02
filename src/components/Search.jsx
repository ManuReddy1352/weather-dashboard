import { useState } from "react";

function Search({ onSearch }) {
  const [city, setCity] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!city) return;
    onSearch(city);
    setCity("");
  };

  return (
    <form className="search-form" onSubmit={submit}>
      <input
        className="search-input"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="search-button">Search</button>
    </form>
  );
}

export default Search;
