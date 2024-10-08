import { useState } from "react";

const Header = () => {
  //! LOCAL STATE
  //! the hook returns an array with ALWAYS two elements
  //! the ONLY WAY TO CORRECTLY UPDATE the state variable is by using the state function
  const [isDarkMode, setIsDarkMode] = useState(true);

  //! LOCAL NON-STATE VARIABLES DO NOT CAUSE RE-RENDERS
  // let count = 0

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  return (
    <header className={isDarkMode ? "header-dark" : "header-light"}>
      <h1>
        <span className="logo">{"//"}</span>
        Project Showcase
      </h1>
      <button onClick={toggleDarkMode}>Dark Mode</button>
    </header>
  );
}

export default Header;