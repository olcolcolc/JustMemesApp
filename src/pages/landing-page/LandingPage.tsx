import * as React from 'react';
import MemeCard from '../../components/meme-card/MemeCard';
import {getDocs, collection, onSnapshot} from 'firebase/firestore'
import { memesDb } from '../../firebase/firebase-config'
import {Meme} from '../../interfaces/MemeInterface'

interface LandingPageProps {
  className?: string;
}

const LandingPage: React.FC<LandingPageProps> = () => {
  const [memes, setMemes] = React.useState<Meme[]>([]);
  const memesCollectionRef = collection(memesDb,"memes")

  // const getMemes = async () => {
  //   try {
  //     const data = await getDocs(memesCollectionRef);
  //     const memesData = data.docs.map((doc) => {
  //       return {
  //         id: doc.id,
  //         title: doc.data().title,
  //         url: doc.data().url,
  //         likes: doc.data().likes,
  //       };
  //     });
  //     setMemes(memesData);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const getMemes = onSnapshot(collection(memesDb,"memes"), (querySnapshot) => {
  //   const memesData = querySnapshot.docs.map((doc) => {
  //     return {
  //       id: doc.id,
  //       title: doc.data().title,
  //       url: doc.data().url,
  //       likes: doc.data().likes,
  //     };
  //   });
  //   console.log(memesData)

  //   setMemes(memesData)
  //   // getMemes()
  // })

  const getMemes = () => {
    return onSnapshot(memesCollectionRef, (querySnapshot) => {
      const memesData = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          title: doc.data().title,
          url: doc.data().url,
          likes: doc.data().likes,
        };
      });
      setMemes(memesData);
      console.log("show memes")
    });
  };
  
  //TODO sprobowac napisac pobieranie api do jak top i regular page
  //TODO exportowac fncje ktora subscribuje z top/regular page

  React.useEffect(() => {
    console.log("s")
    getMemes();
  }, []);
  

  return (
    <div className='landingPage'>
      <div className='memeContainer'>
      {memes.map(meme => (
        <MemeCard key={meme.id} meme={meme} />
      ))}
      </div>
    </div>
  );
};

export default LandingPage;
