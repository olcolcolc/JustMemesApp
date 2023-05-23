import * as React from 'react';
import MemeCard from '../../components/meme-card/MemeCard';
import {collection, onSnapshot} from 'firebase/firestore'
import { memesDb } from '../../firebase/firebase-config'
import {Meme} from '../../interfaces/MemeInterface'

interface LandingPageProps {
  className?: string;
}

const LandingPage: React.FC<LandingPageProps> = () => {
  const [memes, setMemes] = React.useState<Meme[]>([]);
  const memesCollectionRef = collection(memesDb,"memes")

// Getting memes from firebase store
  const getMemes = () => {
    return onSnapshot(memesCollectionRef, (querySnapshot) => {
      const memesData = querySnapshot.docs
        .map((doc) => {
          return {
            id: doc.id,
            title: doc.data().title,
            url: doc.data().url,
            likes: doc.data().likes,
            createdAt: doc.data().createdAt,
          };
        })
      setMemes(memesData);
    });
  };

  React.useEffect(() => {
    getMemes();
  }, []);
  
  return (
    <div className='landingPage'>
      <div className='memeContainer'>
        {memes
          .sort((a, b) => b.createdAt?.toDate()?.getTime() - a.createdAt?.toDate()?.getTime()) // Sorted by date, from oldest to newest
          .map(meme => (
            <MemeCard key={meme.id} meme={meme} />
          ))}
      </div>
    </div>
  );
}  

export default LandingPage;
