import * as React from 'react';
import "./NavbarComponent.scss";
import logoIMG from '../../assets/logo.svg'
import { Link } from 'react-router-dom';


interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
<nav className="navbar">
        <Link to="/">
          <img className='navbar__logo' src={logoIMG} alt="Just Meme logo"></img>
        </Link>
        <div className='navbar__btnContainer'>
          <Link to="/top">
            <button className='navbar__btn-top'>Top</button>
          </Link>
          <Link to="/regular">
          <button className='navbar__btn-regular'>Regular</button>
          </Link>
        </div>
    </nav>
  );
};

//npm run deploy on gh-pages



export default Navbar;
