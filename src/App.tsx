import { useEffect, useState } from "react";
import googleFonts from "google-fonts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopPage from "./pages/TopPage/TopPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import RegularPage from "./pages/RegularPage/RegularPage";
import PostNewMeme from "./components/PostNewMeme/PostNewMeme";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";
import Error404 from "./pages/Error404/Error404";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

function App() {
  useEffect(() => {
    //adding google fonts to script
    googleFonts.add({
      Nunito: true,
    });
    document.body.style.fontFamily = "Nunito, sans-serif";
  }, []);

  const [openModal, setModalOpen] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
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
