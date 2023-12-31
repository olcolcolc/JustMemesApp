import * as React from "react";
import "./NavbarComponent.scss";
import logoIMG from "../../assets/logo.svg";
import { NavLink } from "react-router-dom";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className="navbar">
      <NavLink to="/">
        <img className="navbar__logo" src={logoIMG} alt="Just Meme logo"></img>
      </NavLink>
      <div className="navbar__btnContainer">
        <NavLink className="navbar__link" to="/top">
          <button className="navbar__btn-top">Top</button>
        </NavLink>
        <NavLink className="navbar__link" to="/regular">
          <button className="navbar__btn-regular">Regular</button>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
