import { useEffect, useState } from "react";
import "./ThemeSwitcher.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export default function ThemeSwitcher(): JSX.Element {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("color-scheme", theme);
  }, [theme]);

  return (
    <div>
      <button
        className="themeSwitcher__button"
        aria-label={`Change ${theme === "light" ? "dark" : "light"} mode`}
        role="switch"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "dark" ? (
          <FontAwesomeIcon icon={faSun} />
        ) : (
          <FontAwesomeIcon icon={faMoon} />
        )}
      </button>
    </div>
  );
}
