//navbar.jsx

import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const links = [
    { to: "/", label: "Dashboard", icon: "⬡" },
    { to: "/students", label: "Students", icon: "◈" },
    { to: "/attendance", label: "Attendance", icon: "◉" },
    { to: "/marks", label: "Marks", icon: "◆" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">✦</span>
        <span className="brand-text">Throne8</span>
      </div>
      <ul className="navbar-links">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              <span className="nav-icon">{link.icon}</span>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;