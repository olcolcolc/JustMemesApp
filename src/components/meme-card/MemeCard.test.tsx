import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MemeCard from "./MemeCard";
import { initializeTestEnvironment } from "@firebase/rules-unit-testing";
import * as fs from "fs";
import "text-encoding";

// Inicjalizacja emulatora Firestore
const testEnv: any = await initializeTestEnvironment({
  projectId: "just-memes-app",
  firestore: {
    rules: fs.readFileSync("firestore.rules", "utf8"),
  },
});

// Sample meme data for testing
const sampleMeme = {
  id: "123",
  url: "https://example.com/image.jpg",
  title: "Test Meme",
  likes: 5,
  createdAt: "1/1/2024",
};

beforeEach(async () => {
  testEnv.clearFirestore();
  const db = testEnv.firestore();
  await db.collection("memes").doc(sampleMeme.id).set(sampleMeme);
});

test("renders MemeCard with correct data", () => {
  render(<MemeCard meme={sampleMeme} />);
  const memeImg = screen.getByAltText(sampleMeme.title);
  expect(memeImg).toBeInTheDocument();
});

test("handles like correctly", async () => {
  render(<MemeCard meme={sampleMeme} />);
  const likeButton = screen.getByTestId("like-button");

  fireEvent.click(likeButton);

  // Wait for Firestore to update
  await waitFor(async () => {
    const updatedDoc = await testEnv
      .firestore()
      .collection("memes")
      .doc(sampleMeme.id)
      .get();

    const updatedLikesCount = updatedDoc.data().likes;
    expect(updatedLikesCount).toEqual(sampleMeme.likes + 1);
  });

  // Wait for the UI to update
  await waitFor(() => {
    const likesCount = screen.getByTestId("like-button");
    expect(Number(likesCount.textContent)).toEqual(sampleMeme.likes + 1);
  });
});
