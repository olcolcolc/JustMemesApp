import * as React from "react";
import MemeCard from "../../components/meme-card/MemeCard";
import { Meme } from "../../interfaces/MemeInterface";
import Pagination from "../../components/pagination/Pagination";

interface LandingPageProps {
  landingPageMemes: Meme[];
}

const LandingPage: React.FC<LandingPageProps> = ({ landingPageMemes }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [memesPerPage] = React.useState(5);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Get current memes for pagination
  const indexOfLastMeme = currentPage * memesPerPage;
  const indexOfFirstMeme = indexOfLastMeme - memesPerPage;
  const currentMemes = landingPageMemes.slice(
    indexOfFirstMeme,
    indexOfLastMeme
  );

  return (
    <div className="landingPage">
      <div className="memeContainer">
        {currentMemes
          .sort(
            (a, b) =>
              b.createdAt?.toDate()?.getTime() -
              a.createdAt?.toDate()?.getTime()
          ) // Sorted by date, from oldest to newest
          .map((meme) => (
            <MemeCard key={meme.id} meme={meme} />
          ))}
      </div>
      <Pagination
        memesPerPage={memesPerPage}
        totalMemes={landingPageMemes.length}
        currentPage={currentPage}
        paginate={paginate}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default LandingPage;
