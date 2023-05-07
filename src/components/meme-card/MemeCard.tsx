import * as React from 'react';
import axios from 'axios';
import "./MemeCard.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

interface Meme {
  id: number;
  url: string;
  likes: number;
  dislikes: number;
}

interface MemeCardProps {}

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
            <button className='memeCard__votes-likesBtn'>
              <FontAwesomeIcon icon={faThumbsUp} /></button>
            <span className='memeCard__votes-likes'>
              {meme.likes}</span>

            {/* dislike */}
            <button className='memeCard__votes-dislikesBtn'>
              <FontAwesomeIcon icon={faThumbsDown} /></button>
            <span className='memeCard__votes-likes'>
              {meme.dislikes}</span>
              
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemeCard;
