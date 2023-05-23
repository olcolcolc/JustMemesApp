import * as React from "react";
import "./MemeCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { Meme } from "../../interfaces/MemeInterface";
import { memesDb } from "../../firebase/firebase-config";

interface MemeCardProps {
  meme: Meme;
  className?: string;
}

const MemeCard: React.FC<MemeCardProps> = ({ meme }) => {
  const [likes, setLikes] = React.useState(meme.likes);

  // Function to handle voting for a meme
  const handleVote = async (id: string, vote: "+" | "-") => {
    const memeRef = doc(memesDb, "memes", id);
    const memeDoc = await getDoc(memeRef);

    if (memeDoc.exists()) {
      const memeData = memeDoc.data() as Meme;
      let updatedLikes = memeData.likes;

      // Increment or decrement likes based on the vote type
      if (vote === "+") {
        updatedLikes += 1;
      } else if (vote === "-") {
        updatedLikes -= 1;
      }

      // Update the likes in the database and set the updated likes in state
      await updateDoc(memeRef, { likes: updatedLikes });
      setLikes(updatedLikes);
    }
  };

  return (
    <div className="memeCard">
      <img className="memeCard__img" src={meme.url} alt={meme.title} />
      <div className="memeCard__votes">
        <button
          className="memeCard__votes-likeBtn"
          onClick={() => handleVote(meme.id, "+")}
        >
          <FontAwesomeIcon icon={faThumbsUp} />
        </button>
        <div className="memeCard__votes-likes">{likes}</div>
        <button
          className="memeCard__votes-dislikeBtn"
          onClick={() => handleVote(meme.id, "-")}
        >
          <FontAwesomeIcon icon={faThumbsDown} />
        </button>
      </div>
    </div>
  );
};

export default MemeCard;
