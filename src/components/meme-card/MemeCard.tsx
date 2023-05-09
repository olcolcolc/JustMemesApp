import * as React from 'react';
import "./MemeCard.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { memesDb } from '../../firebase/firebase-config'
import {getDocs, updateDoc, doc, collection} from 'firebase/firestore'


interface Meme {
  title: string;
  id: string;
  url: string;
  likes: number
}

interface MemeCardProps {
  className?: string;
}

const MemeCard: React.FC<MemeCardProps> = () => {
  //memes - list of memes
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


 //param id - ID of the meme to vote on.
 //param vote - either "+" for upvote or "-" for downvote.
 const handleVote = async (id: string, vote: "+" | "-") => {
  console.log("+1")
  // Update the state of the memes array
  setMemes(prevMemes => {
    // Create a new copy of the memes array (newMemes)
    const newMemes = [...prevMemes];
    // Find the index of the meme with the matching ID
    const memeIndex = newMemes.findIndex(meme => meme.id === id);
    // If the vote is an upvote, increment
    if (vote === "+") {
      newMemes[memeIndex].likes++;
      // Update the value of likes in the corresponding document in Firestore
      updateDoc(doc(memesDb, 'memes', id), { likes: newMemes[memeIndex].likes });
      console.log("+")
      // If the vote is a downvote, decrement
    } else if (vote === "-") {
      newMemes[memeIndex].likes--;
      // Update the value of likes in the corresponding document in Firestore
      updateDoc(doc(memesDb, 'memes', id), { likes: newMemes[memeIndex].likes });
    }     
    // Return the updated memes array to set the new state
    return newMemes;   
  });
};
  
  
  return (
    //Cointains all meme cards
    <div className='memeContainer'>
      {memes.map(meme => (

        //meme card
        <div key={meme.id} className='memeCard'>

          {/* meme image */}
          <img className='memeCard__img' src={meme.url} alt='meme' />

          {/* container with vote buttons and votes */}
          <div className='memeCard__votes'>
            
            {/* like */}
            <button className='memeCard__votes-likeBtn'
                    onClick={() => handleVote(meme.id, "+")}>
              <FontAwesomeIcon icon={faThumbsUp} /></button>

            <div className='memeCard__votes-likes'>
              {meme.likes}</div>

            {/* dislike */}
            <button className='memeCard__votes-dislikeBtn'
                    onClick={() => handleVote(meme.id, "-")}>
              <FontAwesomeIcon icon={faThumbsDown} /></button>

          </div>
        </div>
      ))}
    </div>
  );
};

export default MemeCard;
