import * as React from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { memesDb } from "../../firebase/firebase";
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
  // State variables for toast
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");

  //Modal animation
  const animationProps = useSpring({
    opacity: open ? 1 : 0,
    config: { duration: 300 },
  });

  //Toast animation
  const toastAnimationProps = useSpring({
    transform: showToast ? "translateX(0)" : "translateX(35%)",
  });

  // Function to add a new meme to the database with validation
  const addMeme = async () => {
    // Check if URL and title are not provided
    if (!url && !title) {
      setShowToast(true);
      setToastMessage("Insert URL and title");
      // Check if the URL is not valid
    } else if (!isValidUrl(url)) {
      setShowToast(true);
      setToastMessage("Your URL is not valid");
      // Check if the title is not provided
    } else if (!title) {
      setShowToast(true);
      setToastMessage("Insert title");
      // All inputs are valid, proceed to add the meme to the database
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
        await addDoc(memesCollectionRef, newMeme); // Add the meme document to the collection and close modal
        handleModalClose();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleModalClose = () => {
    setUrl(""); // Reset url state
    setTitle(""); // Reset title state
    onClose(); // Close modal
    setShowToast(false); // Reset toast state
    setToastMessage(""); // Reset toast message
  };

  const handleTitleClick = () => {
    setToastMessage("Please describe the real content of meme");
    setShowToast(true);
  };

  // Url validation handler
  const isValidUrl = (url: string) => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  };

  return open ? (
    <animated.div
      style={animationProps}
      onClick={handleModalClose}
      className="overlay"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="postNewMeme__modal-container"
      >
        <button
          onClick={handleModalClose}
          className="postNewMeme__modal-container-closeBtn"
          aria-label="Add new meme"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="postNewMeme__modal-content">
          <div className="postNewMeme__modal-content-title">Add your meme</div>
          <form>
            <div className="postNewMeme__modal-content-formGroup">
              <div className="postNewMeme__modal-content-formGroup-url">
                <label
                  htmlFor="url"
                  className="postNewMeme__modal-content-label"
                >
                  Enter your meme URL:
                </label>
                <input
                  type="text"
                  className="postNewMeme__modal-content-formControl"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  aria-label="enter your meme url"
                />
              </div>
              <div className="postNewMeme__modal-content-formGroup-title">
                <label
                  htmlFor="title"
                  className="postNewMeme__modal-content-label"
                >
                  Enter your meme title:
                </label>
                <input
                  type="text"
                  className="postNewMeme__modal-content-formControl"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onClick={handleTitleClick}
                  aria-label="enter your meme title"
                />
              </div>
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
              aria-label="close post new meme modal"
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
