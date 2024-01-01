import * as React from "react";
import MemeCard from "../../components/meme-card/MemeCard";
import { collection, onSnapshot } from "firebase/firestore";
import { memesDb } from "../../firebase/firebase-config";
import { Meme } from "../../interfaces/MemeInterface";
import Pagination from "../../components/pagination/Pagination";

const RegularPage: React.FC = () => {
  const [memes, setMemes] = React.useState<Meme[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [memesPerPage] = React.useState(5);
  const memesCollectionRef = collection(memesDb, "memes");

  const subscribeToRegularMemes = () => {
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
      const regularMemesData = memesData.filter((meme) => meme.likes <= 5);
      setMemes(regularMemesData);
    });
  };

  React.useEffect(() => {
    const unsubscribe = subscribeToRegularMemes();

    return () => {
      unsubscribe();
    };
  }, []);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const indexOfLastMeme = currentPage * memesPerPage;
  const indexOfFirstMeme = indexOfLastMeme - memesPerPage;
  const currentMemes = memes.slice(indexOfFirstMeme, indexOfLastMeme);

  return (
    <div className="topPage">
      <div className="memeContainer">
        {currentMemes.map((meme) => (
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

export default RegularPage;
