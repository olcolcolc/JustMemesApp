import React, { useState, useEffect } from "react";
import "./MemeCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { Meme } from "../../interfaces/MemeInterface";
import { memesDb } from "../../firebase/firebase-config";
import { animated, useSpring } from "@react-spring/web";

interface MemeCardProps {
  meme: Meme;
  className?: string;
}

const MemeCard: React.FC<MemeCardProps> = ({ meme }) => {
  const [likes, setLikes] = useState(meme.likes);

  // Modal animation
  const opacityAnimation = useSpring({
    from: {
      opacity: 0,
    },
    opacity: 1,
  });

  // Voting for meme handler
  const handleVote = async (id: string, vote: "+" | "-") => {
    const memeRef = doc(memesDb, "memes", id);
    const memeDoc = await getDoc(memeRef);

    // Check if the meme document exists
    if (memeDoc.exists()) {
      const memeData = memeDoc.data() as Meme;
      // Create a variable to store upadted likes count
      let updatedLikes = memeData.likes;

      // Update likes count based on the vote type
      if (vote === "+") {
        updatedLikes += 1;
      } else if (vote === "-") {
        updatedLikes -= 1;
      }

      // Update likes in the meme doc in database and the likes state
      await updateDoc(memeRef, { likes: updatedLikes });
      setLikes(updatedLikes);
    }
  };

  return (
    <animated.div className="memeCard" style={opacityAnimation}>
      <img className="memeCard__img" src={meme.url} alt={meme.title} />
      <div className="memeCard__votes">
        <button
          className="memeCard__votes-likeBtn"
          onClick={() => handleVote(meme.id, "+")}
          aria-label="Click like"
        >
          <FontAwesomeIcon icon={faThumbsUp} />
        </button>
        <div className="memeCard__votes-likes">{likes}</div>
        <button
          className="memeCard__votes-dislikeBtn"
          onClick={() => handleVote(meme.id, "-")}
          aria-label="Click dislike"
        >
          <FontAwesomeIcon icon={faThumbsDown} />
        </button>
      </div>
    </animated.div>
  );
};

export default MemeCard;
