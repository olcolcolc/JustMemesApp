import { collection, onSnapshot, Unsubscribe } from "firebase/firestore";
import { memesDb } from "../firebase/firebase-config";
import { Meme } from "../interfaces/MemeInterface";

class FetchMemesData {
  private unsubscribe: Unsubscribe | null = null;

  public getMemes = (): Promise<Meme[]> => {
    const memesCollectionRef = collection(memesDb, "memes");

    return new Promise((resolve, reject) => {
      this.unsubscribe = onSnapshot(
        memesCollectionRef,
        (querySnapshot) => {
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

  public getTopMemes = (): Promise<Meme[]> => {
    return this.getMemes().then((memesData) =>
      memesData.filter((meme) => meme.likes > 5)
    );
  };

  public getRegularMemes = (): Promise<Meme[]> => {
    return this.getMemes().then((memesData) =>
      memesData.filter((meme) => meme.likes < 6)
    );
  };

  public unsubscribeMemes = () => {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  };
}

const fetchMemesData = new FetchMemesData();
export default fetchMemesData;
