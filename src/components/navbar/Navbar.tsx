import "./Navbar.scss";
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
        <NavLink className="navbar__btn-top" to="/top">
          Top
        </NavLink>
        <NavLink className="navbar__btn-regular" to="/regular">
          Regular
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
