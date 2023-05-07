import * as React from 'react';
import axios from 'axios';
import "./MemeCard.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

interface Meme {
  id: number;
  url: string;
  likes: number
}

interface MemeCardProps {
  className?: string;
}

const MemeCard: React.FC<MemeCardProps> = () => {
  const [memes, setMemes] = React.useState<Meme[]>([]);

  React.useEffect(() => {
    axios.get('https://raw.githubusercontent.com/olcolcolc/JustMemesApp/master/public/memes.json')
      .then(response => {
        setMemes(response.data.memes);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);



 //param id - ID of the meme to vote on.
 //param vote - either "+" for upvote or "-" for downvote.
const handleVote = (id: number, vote: "+" | "-") => {
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
      // axios.put(`https://example.com/memes/${id}`, {
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
