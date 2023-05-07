import React from 'react';
import './App.css';
import googleFonts from 'google-fonts';
import NavbarComponent from './components/navbar/NavbarComponent';
import MemeCard from './components/meme-card/MemeCard';

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
      <div className="App">
        <NavbarComponent />
        <MemeCard/>
      </div>
    );
  }
}

export default App;
