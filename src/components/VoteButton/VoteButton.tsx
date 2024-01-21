import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { memesDb } from "../../firebase/firebase-config";
import { Meme } from "../../interfaces/MemeInterface";
import "./VoteButton.scss";

interface VoteButtonProps {
  memeId: string;
  voteType: "+" | "-";
}

const VoteButton: React.FC<VoteButtonProps> = ({ memeId, voteType }) => {
  const [likes, setLikes] = useState<number>(0);

  // Voting for meme handler
  const handleVote = async (id: string, vote: "+" | "-") => {
    const memeRef = doc(memesDb, "memes", id);
    const memeDoc = await getDoc(memeRef);

    // Check if the meme document exists
    if (memeDoc.exists()) {
      const memeData = memeDoc.data() as Meme;
      // Create a variable to store updated likes count
      let updatedLikes = memeData.likes;

      // Update likes count based on the vote type
      if (vote === "+") {
        updatedLikes += 1;
      } else if (vote === "-") {
        updatedLikes -= 1;
      }

      // Update likes in the meme doc in the database and the likes state
      await updateDoc(memeRef, { likes: updatedLikes });
      setLikes(updatedLikes);
    }
  };

  return (
    <button
      className={`vote-${voteType === "+" ? "like" : "dislike"}Btn`}
      onClick={() => handleVote(memeId, voteType)}
      aria-label={`Click ${voteType === "+" ? "like" : "dislike"}`}
    >
      <FontAwesomeIcon icon={voteType === "+" ? faThumbsUp : faThumbsDown} />
    </button>
  );
};

export default VoteButton;
