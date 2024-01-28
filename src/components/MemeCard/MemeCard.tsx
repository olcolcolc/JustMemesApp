import React, { useState } from "react";
import "./MemeCard.scss";
import { Meme } from "../../interfaces/MemeInterface";
import { animated, useSpring } from "@react-spring/web";
import VoteButton from "../VoteButton/VoteButton";

interface MemeCardProps {
  meme: Meme;
  className?: string;
}

const MemeCard: React.FC<MemeCardProps> = ({ meme }) => {
  // Modal animation
  const opacityAnimation = useSpring({
    from: {
      opacity: 0,
    },
    opacity: 1,
  });

  return (
    <animated.li className="memeCard" style={opacityAnimation}>
      <img className="memeCard__img" src={meme.url} alt={meme.title} />
      <div className="memeCard__votes">
        <VoteButton memeId={meme.id} voteType="+" />
        <div className="memeCard__likes">{meme.likes}</div>
        <VoteButton memeId={meme.id} voteType="-" />
      </div>
    </animated.li>
  );
};

export default MemeCard;
