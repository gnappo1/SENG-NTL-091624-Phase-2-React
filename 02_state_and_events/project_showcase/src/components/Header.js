import { useState } from "react";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(true)

  const handleClick = (e) => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <header className={isDarkMode ? "header-dark" : "header-light"}>
      <h1>
        <span className="logo">{"//"}</span>
        Project Showcase
      </h1>
      <button onClick={handleClick}>Dark Mode</button>
    </header>
  );
}

export default Header;
