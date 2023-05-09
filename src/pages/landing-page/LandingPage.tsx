import * as React from 'react';
import MemeCard from '../../components/meme-card/MemeCard';
import {getDocs, collection} from 'firebase/firestore'
import { memesDb } from '../../firebase/firebase-config'
import {Meme} from '../../interfaces/MemeInterface'

interface LandingPageProps {
  className?: string;
}

const LandingPage: React.FC<LandingPageProps> = () => {
  const [memes, setMemes] = React.useState<Meme[]>([]);
  const memesCollectionRef = collection(memesDb,"memes")

  const getMemes = async () => {
    try {
      const data = await getDocs(memesCollectionRef);
      const memesData = data.docs.map((doc) => {
        return {
          id: doc.id,
          title: doc.data().title,
          url: doc.data().url,
          likes: doc.data().likes,
        };
      });
      setMemes(memesData);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getMemes();
  }, []);

  return (
    <div className='landingPage'>
      {memes.map(meme => (
        <MemeCard key={meme.id} meme={meme} />
      ))}
    </div>
  );
};

export default LandingPage;
