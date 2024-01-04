import * as React from "react";
import MemeCard from "../../components/meme-card/MemeCard";
import { collection, onSnapshot } from "firebase/firestore";
import { memesDb } from "../../firebase/firebase-config";
import { Meme } from "../../interfaces/MemeInterface";
import Pagination from "../../components/pagination/Pagination";
import usePagination from "../../components/pagination/usePagination"; // Import hook

const TopPage: React.FC = () => {
  const [memes, setMemes] = React.useState<Meme[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const memesCollectionRef = collection(memesDb, "memes");

  const getTopMemes = () => {
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
      // Filtering memes with likes greater than 5
      const topMemesData = memesData.filter((meme) => meme.likes > 5);
      setMemes(topMemesData);
    });
  };

  React.useEffect(() => {
    getTopMemes();
  }, []);

  // Handle pagination changes
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Using the pagination hook to manage meme pagination
  const { currentMemes } = usePagination(memes, currentPage, paginate);

  return (
    <div className="topPage">
      <div className="memeContainer">
        {currentMemes.map((meme) => (
          <MemeCard key={meme.id} meme={meme} />
        ))}
      </div>
      <Pagination
        totalMemes={memes.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default TopPage;
