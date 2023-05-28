import * as React from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { memesDb } from "../../firebase/firebase-config";
import { Meme } from "../../interfaces/MemeInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./PostNewMeme.scss";
import { useSpring } from "@react-spring/core";
import { animated } from "@react-spring/web";

interface PostNewMemeProps {
  open: boolean;
  onClose: () => void;
}

const PostNewMeme: React.FC<PostNewMemeProps> = ({ open, onClose }) => {
  // State variables for URL and title inputs
  const [url, setUrl] = React.useState("");
  const [title, setTitle] = React.useState("");

  const animationProps = useSpring({
    opacity: open ? 1 : 0,
    config: { duration: 300 },
  });

  // Function to add a new meme to the database
  const addMeme = async () => {
    const memesCollectionRef = collection(memesDb, "memes");
    const newMeme: Meme = {
      url,
      title,
      likes: 0,
      id: "",
      createdAt: Timestamp.fromDate(new Date()),
    };
    try {
      await addDoc(memesCollectionRef, newMeme);
      setUrl("");
      setTitle("");
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return open ? (
    <animated.div style={animationProps} onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="postNewMeme__modal-container"
      >
        <p onClick={onClose} className="postNewMeme__modal-container-closeBtn">
          <FontAwesomeIcon icon={faTimes} />
        </p>
        <div className="postNewMeme__modal-content">
          <div className="postNewMeme__modal-content-title">Add your meme</div>
          <form>
            <div className="postNewMeme__modal-content-formGroup">
              <input
                type="text"
                className="postNewMeme__modal-content-formControl"
                id="url"
                placeholder="Enter your meme URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="postNewMeme__modal-content-formControl"
                id="title"
                placeholder="Enter your meme title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </form>
          <div className="postNewMeme__modal-btnContainer">
            <button
              className="postNewMeme__modal-btnContainer-btns"
              onClick={addMeme}
            >
              Add
            </button>
            <button
              className="postNewMeme__modal-btnContainer-btns"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </animated.div>
  ) : null;
};

export default PostNewMeme;
