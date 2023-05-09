import * as React from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { memesDb } from '../../firebase/firebase-config';
import { Meme } from '../../interfaces/MemeInterface';
import './PostNewMeme.scss'

interface PostNewMemeProps {
    open: boolean;
    onClose: () => void;
}

const PostNewMeme: React.FC<PostNewMemeProps> = ({ open, onClose }) => {
    if(!open) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [url, setUrl] = React.useState('');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [title, setTitle] = React.useState('');

  const addMeme = async () => {
    const memesCollectionRef = collection(memesDb, 'memes');
    const newMeme: Meme = {
        url, title, likes: 0,
        id: ''
    };
    try {
      await addDoc(memesCollectionRef, newMeme);
      setUrl('');
      setTitle('');
      onClose(); // zamknij modal
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div onClick={onClose} className='overlay'>
      <div
            onClick={(e) =>{
                e.stopPropagation();
            }}
            className="postNewMeme__modal"
            >
        <p  onClick={onClose} 
            className='postNewMeme__modal-closeBtn'>
            X
          </p>
          <form>
            <div className="form-group">
              <label htmlFor="url">URL</label>
              <input
                type="text"
                className="form-control"
                id="url"
                placeholder="Enter URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </form>
          <div className="postNewMeme__modal-btnContainer">
          <button color="primary" onClick={addMeme}>
            Add
          </button>{' '}
          <button color="secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostNewMeme;
