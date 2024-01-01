import React, { useEffect, useState } from "react";
import googleFonts from "google-fonts";
import NavbarComponent from "./components/navbar/NavbarComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopPage from "./pages/top-page/TopPage";
import LandingPage from "./pages/landing-page/LandingPage";
import RegularPage from "./pages/regular-page/RegularPage";
import PostNewMeme from "./components/post-new-meme/PostNewMeme";
import ThemeSwitcher from "./components/theme-switcher/ThemeSwitcher";
import Error404 from "./pages/error404/Error404";
import Footer from "./components/footer/Footer";
import { Meme } from "./interfaces/MemeInterface";
import getMemes from "./utils/getMemes";

function App() {
  const [openModal, setModalOpen] = useState(false);
  const [memes, setMemes] = React.useState<Meme[]>([]);

  useEffect(() => {
    //adding google fonts to script
    googleFonts.add({
      Nunito: true,
    });
    document.body.style.fontFamily = "Nunito, sans-serif";

    // Get memesData
    getMemes()
      .then((memesData) => {
        setMemes(memesData);
      })
      .catch((error) => {
        console.error("Error fetching memes:", error);
      });
  }, []);

  return (
    <>
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<LandingPage landingPageMemes={memes} />} />
          <Route path="/top" element={<TopPage />} />
          <Route path="/regular" element={<RegularPage />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>

      <ThemeSwitcher />
      <button onClick={() => setModalOpen(true)} className="postNewMeme__btn">
        +
      </button>

      <PostNewMeme open={openModal} onClose={() => setModalOpen(false)} />

      <Footer />
    </>
  );
}

export default App;
