import * as React from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { memesDb } from "../../firebase/firebase-config";
import { Meme } from "../../interfaces/MemeInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./PostNewMeme.scss";
import { useSpring, animated } from "@react-spring/web";

interface PostNewMemeProps {
  open: boolean;
  onClose: () => void;
}

const PostNewMeme: React.FC<PostNewMemeProps> = ({ open, onClose }) => {
  // State variables for URL and title inputs
  const [url, setUrl] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");

  const animationProps = useSpring({
    opacity: open ? 1 : 0,
    config: { duration: 300 },
  });

  const toastAnimationProps = useSpring({
    transform: showToast ? "translateX(0)" : "translateX(100%)",
  });

  // Function to add a new meme to the database
  const addMeme = async () => {
    if (!url && !title) {
      setShowToast(true);
      setToastMessage("Insert url and title");
    } else if (!url) {
      setShowToast(true);
      setToastMessage("Insert url");
    } else if (!title) {
      setShowToast(true);
      setToastMessage("Insert title");
    } else {
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
        setShowToast(false); // Reset toast state
        setToastMessage(""); // Reset toast message
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleModalClose = () => {
    setUrl(""); // Reset url state
    setTitle(""); // Reset title state
    onClose();
    setShowToast(false); // Reset toast state
    setToastMessage(""); // Reset toast message
  };

  return open ? (
    <animated.div style={animationProps} onClick={handleModalClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="postNewMeme__modal-container"
      >
        <p onClick={handleModalClose} className="postNewMeme__modal-container-closeBtn">
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
              onClick={handleModalClose}
            >
              Cancel
            </button>
          </div>
        </div>
        <animated.p
          style={toastAnimationProps}
          className="postNewMeme__modal-container__toast"
        >
          {toastMessage}
        </animated.p>
      </div>
    </animated.div>
  ) : null;
};

export default PostNewMeme;
