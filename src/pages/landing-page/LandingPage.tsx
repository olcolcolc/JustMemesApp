import * as React from "react";
import MemeCard from "../../components/meme-card/MemeCard";
import { Meme } from "../../interfaces/MemeInterface";
import Pagination from "../../components/pagination/Pagination";
import fetchMemesData from "../../utils/getMemes";

const LandingPage: React.FC = () => {
  const [memes, setMemes] = React.useState<Meme[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [memesPerPage] = React.useState(5);

  React.useEffect(() => {
    // Get memesData
    fetchMemesData
      .getMemes()
      .then((memesData) => {
        setMemes(memesData);
      })
      .catch((error) => {
        console.error("Error fetching memes:", error);
      });
  }, []);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Get current memes for pagination
  const indexOfLastMeme = currentPage * memesPerPage;
  const indexOfFirstMeme = indexOfLastMeme - memesPerPage;
  const currentMemes = memes.slice(indexOfFirstMeme, indexOfLastMeme);

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
        totalMemes={memes.length}
        currentPage={currentPage}
        paginate={paginate}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default LandingPage;
