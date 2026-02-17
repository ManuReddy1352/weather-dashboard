import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>
      <NavLink to="/forecast" className="nav-link">
        Forecast
      </NavLink>
      <NavLink to="/favorites" className="nav-link">
        Favorites
      </NavLink>
      <NavLink to="/about" className="nav-link">
        About
      </NavLink>
    </nav>
  );
}

export default Navbar;
