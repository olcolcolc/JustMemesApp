import * as React from "react";
import MemeCard from "../../components/MemeCard/MemeCard";
import { collection, onSnapshot } from "firebase/firestore";
import { memesDb } from "../../firebase/firebase-config";
import { Meme } from "../../interfaces/MemeInterface";
import Pagination from "../../components/Pagination/Pagination";
import usePagination from "../../components/Pagination/usePagination";

const RegularPage: React.FC = () => {
  const [memes, setMemes] = React.useState<Meme[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const memesCollectionRef = collection(memesDb, "memes");

  const getRegularMemes = () => {
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
      // Filtering memes with likes less than or equal to 5
      const regularMemesData = memesData.filter((meme) => meme.likes <= 5);
      setMemes(regularMemesData);
    });
  };

  React.useEffect(() => {
    getRegularMemes();
  }, []);

  // Handle pagination changes
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Using the pagination hook to manage meme pagination
  const { currentMemes } = usePagination(memes, currentPage, paginate);

  return (
    <div className="topPage">
      <ul className="memeContainer">
        {currentMemes.map((meme) => (
          <MemeCard key={meme.id} meme={meme} />
        ))}
      </ul>
      <Pagination
        totalMemes={memes.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default RegularPage;
