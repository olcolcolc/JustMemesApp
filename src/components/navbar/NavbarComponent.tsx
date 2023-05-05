import * as React from 'react';
import "./NavbarComponent.scss";
import logoIMG from '../../assets/logo.png'


interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className='navbar'>
        <img className='navbar__logo' src={logoIMG} alt="Just Meme logo"></img>
        <div className='navbar__btnContainer'>
          <button className='navbar__btn-top'>Top</button>
          <button className='navbar__btn-regular'>Regular</button>
        </div>
    </nav>
  );
};



export default Navbar;
