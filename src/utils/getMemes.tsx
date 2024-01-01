import { collection, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { memesDb } from "../firebase/firebase-config";
import { Meme } from "../interfaces/MemeInterface";

const getMemes = (): Promise<Meme[]> => {
  const memesCollectionRef = collection(memesDb, "memes");

  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      memesCollectionRef,
      (querySnapshot: QuerySnapshot) => {
        const memesData: Meme[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          url: doc.data().url,
          likes: doc.data().likes,
          createdAt: doc.data().createdAt,
        }));
        resolve(memesData);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export default getMemes;
