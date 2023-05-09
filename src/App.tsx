import React from 'react';
import './App.css';
import googleFonts from 'google-fonts';
import NavbarComponent from './components/navbar/NavbarComponent';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopPage from './pages/top-page/TopPage';
import LandingPage from './pages/landing-page/LandingPage';


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
            <Route path="/top" Component={TopPage} />
          </Routes>
      </BrowserRouter>
    );
  }
}


export default App;
