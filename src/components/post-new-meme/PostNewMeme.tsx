import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { addDoc, collection } from 'firebase/firestore';
import { memesDb } from '../../firebase/firebase-config';
import { Meme } from '../../interfaces/MemeInterface';
import './PostNewMeme.scss'

interface PostNewMemeProps {
  onCloseModal: () => void;
}

const PostNewMeme: React.FC<PostNewMemeProps> = ({ onCloseModal }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [url, setUrl] = React.useState('');
  const [title, setTitle] = React.useState('');

  const toggleModal = () => setModalOpen(!modalOpen);

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
      toggleModal();
      onCloseModal(); // zamknij modal
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        onClick={toggleModal}
        className="postNewMeme__btn"
      >+
      </Button>
      <Modal isOpen={modalOpen} 
             toggle={toggleModal}
             className="postNewMeme__modal"
             >
        <ModalHeader toggle={toggleModal}
                    className="postNewMeme__modal-header"
                    >Add new meme</ModalHeader>
        <ModalBody>
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
        </ModalBody>
        <ModalFooter
        className="postNewMeme__modal-footer">
          <Button color="primary" onClick={addMeme}>
            Add
          </Button>{' '}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default PostNewMeme;
