import { FiCheckSquare, FiMoon, FiSun } from "react-icons/fi";

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <div className="navbar__icon">
          <FiCheckSquare />
        </div>
        <div>
          <h1>Task Tracker</h1>
          <p>Manage your daily tasks</p>
        </div>
      </div>

      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      >
        {theme === "light" ? <FiMoon /> : <FiSun />}
      </button>
    </header>
  );
};

export default Navbar;