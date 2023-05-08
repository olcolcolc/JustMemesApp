import React from 'react';
import './App.css';
import googleFonts from 'google-fonts';
import NavbarComponent from './components/navbar/NavbarComponent';
import LandingPage from './pages/landing-page/LandingPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";


class App extends React.Component {
  componentDidMount() {
    //adding google fonts to script
    googleFonts.add({
      'Nunito': true,
    });
    document.body.style.fontFamily = 'Nunito, sans-serif';
  }

  render() {
    return (
      <BrowserRouter>
        <NavbarComponent/>
          <Routes>
            <Route path="/" Component={LandingPage} />
          </Routes>
      </BrowserRouter>
    );
  }
}


export default App;
