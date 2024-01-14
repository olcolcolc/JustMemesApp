import * as React from "react";
import MemeCard from "../../components/meme-card/MemeCard";
import { collection, onSnapshot } from "firebase/firestore";
import { memesDb } from "../../firebase/firebase";
import { Meme } from "../../interfaces/MemeInterface";
import Pagination from "../../components/pagination/Pagination";
import usePagination from "../../components/pagination/usePagination"; // Importing the pagination hook

const LandingPage: React.FC = () => {
  // State to store meme data and current page number
  const [memes, setMemes] = React.useState<Meme[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);

  // Reference to the 'memes' collection in the Firebase Firestore
  const memesCollectionRef = collection(memesDb, "memes");

  // Get memes data from Firebase Firestore
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
      setMemes(memesData); // Set memes into state
    });
  };

  // Fetch memes data when the component mounts
  React.useEffect(() => {
    getMemes();
  }, []);

  // Function to update the current page number
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Using the pagination hook to manage meme pagination
  const { currentMemes } = usePagination(
    memes, // Array of memes
    currentPage, // Current active page
    paginate // Function to handle page changes
  );

  return (
    <div className="landingPage">
      <div className="memeContainer">
        {/* Displaying the memes sorted by date */}
        {currentMemes
          .sort(
            (a, b) =>
              b.createdAt?.toDate()?.getTime() -
              a.createdAt?.toDate()?.getTime()
          )
          .map((meme) => (
            <MemeCard key={meme.id} meme={meme} /> // Rendering MemeCard for each meme
          ))}
      </div>
      {/* Pagination component */}
      <Pagination
        totalMemes={memes.length} // Total number of memes
        currentPage={currentPage} // Current active page
        paginate={paginate} // Function to change the current page
      />
    </div>
  );
};

export default LandingPage;
