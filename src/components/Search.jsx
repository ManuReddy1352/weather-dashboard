import { useEffect, useRef, useState } from "react";
import { getCitySuggestions } from "../services/weatherApi";

function Search({ onSearch }) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const wrapperRef = useRef(null);
  const isSelectingRef = useRef(false);

  useEffect(() => {
    if (isSelectingRef.current) {
      isSelectingRef.current = false;
      return;
    }

    if (city.trim().length < 2) {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const data = await getCitySuggestions(city);
        setSuggestions(data);
        setActiveIndex(-1);
      } catch {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [city]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!wrapperRef.current.contains(e.target)) {
        setSuggestions([]);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSelect = (selectedCity) => {
    isSelectingRef.current = true;

    onSearch(selectedCity.name);

    setCity("");
    setSuggestions([]);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!suggestions.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0) {
        handleSelect(suggestions[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setActiveIndex(-1);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    onSearch(city);
    setCity("");
    setSuggestions([]);
    setActiveIndex(-1);
  };

  return (
    <div className="search-wrapper" ref={wrapperRef}>
      <form className="search-form" onSubmit={submit}>
        <input
          className="search-input"
          placeholder="Enter city name"
          value={city}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        <button className="search-button">Search</button>
      </form>

      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((s, i) => (
            <div
              key={i}
              className={`suggestion-item ${i === activeIndex ? "active" : ""}`}
              onClick={() => handleSelect(s)}
            >
              {s.name}
              {s.state ? `, ${s.state}` : ""}, {s.country}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
