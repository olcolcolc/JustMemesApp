import * as React from "react";
import MemeCard from "../../components/meme-card/MemeCard";
import { collection, onSnapshot } from "firebase/firestore";
import { memesDb } from "../../firebase/firebase-config";
import { Meme } from "../../interfaces/MemeInterface";

interface TopPageProps {
  className?: string;
}

const TopPage: React.FC<TopPageProps> = () => {
  const [memes, setMemes] = React.useState<Meme[]>([]);
  const memesCollectionRef = collection(memesDb, "memes");

  // Getting memes from firebase store and filtered
  const subscribeToTopMemes = () => {
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
      const topMemesData = memesData.filter((meme) => meme.likes > 5);
      setMemes(topMemesData);
    });
  };

  React.useEffect(() => {
    // Subscribe to memes updates when the component mounts
    const unsubscribe = subscribeToTopMemes();

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="topPage">
      <div className="memeContainer">
        {memes.map((meme) => (
          <MemeCard key={meme.id} meme={meme} />
        ))}
      </div>
    </div>
  );
};

export default TopPage;
