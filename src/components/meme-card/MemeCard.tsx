import * as React from 'react';
import "./MemeCard.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { memesDb } from '../../firebase/firebase-config'
import {getDocs, collection} from 'firebase/firestore'


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

  React.useEffect(() => {
    const getMemes = async () => {
    //READ THE DATA
    //SET THE MEME LIST
    try{
      const data = await getDocs(memesCollectionRef)
      console.log(data)
    } catch (err) {
      console.error(err)
    }
    }
    getMemes()
  }, [memesCollectionRef])


  

 //param id - ID of the meme to vote on.
 //param vote - either "+" for upvote or "-" for downvote.
const handleVote = (id: string, vote: "+" | "-") => {
  // Update the state of the memes array
  setMemes(prevMemes => {
    // Create a new copy of the memes array (newMemes)
    const newMemes = [...prevMemes];
    // Find the index of the meme with the matching ID
    const memeIndex = newMemes.findIndex(meme => meme.id === id);
    // If the vote is an upvote, increment
    if (vote === "+") {
      newMemes[memeIndex].likes++;
    // If the vote is a downvote, decrement
    } else if (vote === "-") {
      newMemes[memeIndex].likes--;
    }

      // Update rating in the API
      // axios.put('/memes.json', {
      //   likes: newMemes[memeIndex].likes
      // })
      //   .then(response => {
      //     console.log(response);
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });      

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
