import * as React from "react";
import MemeCard from "../../components/meme-card/MemeCard";
import { collection, onSnapshot } from "firebase/firestore";
import { memesDb } from "../../firebase/firebase-config";
import { Meme } from "../../interfaces/MemeInterface";
import Pagination from "../../components/pagination/Pagination";

interface LandingPageProps {
  className?: string;
}

const LandingPage: React.FC<LandingPageProps> = () => {
  const [memes, setMemes] = React.useState<Meme[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [memesPerPage] = React.useState(5);
  const memesCollectionRef = collection(memesDb, "memes");

  // Getting memes from firebase store
  const getMemes = () => {
    return onSnapshot(memesCollectionRef, (querySnapshot) => {
      const memesData = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          title: doc.data().title,
          url: doc.data().url,
          likes: doc.data().likes,
          createdAt: doc.data().createdAt,
        };
      });
      setMemes(memesData); // Update the memes state
    });
  };

  React.useEffect(() => {
    getMemes();
  }, []);

  // Get current memes for pagination
  const indexOfLastMeme = currentPage * memesPerPage;
  const indexOfFirstMeme = indexOfLastMeme - memesPerPage;
  const currentMemes = memes.slice(indexOfFirstMeme, indexOfLastMeme);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
        paginate={paginate}
      />
    </div>
  );
};

export default LandingPage;
