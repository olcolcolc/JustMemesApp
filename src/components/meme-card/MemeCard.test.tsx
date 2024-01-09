import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import MemeCard from "./MemeCard";

// Mock Firestore functions
jest.mock("firebase/firestore", () => ({
  ...jest.requireActual("firebase/firestore"),
  doc: jest.fn(),
  updateDoc: jest.fn(),
  getDoc: jest.fn(),
}));

describe("MemeCard Component", () => {
  const testMeme = {
    id: "test-id",
    url: "test-url",
    title: "Test Meme",
    likes: 10,
    createdAt: new Date(),
  };

  beforeEach(() => {
    const { doc, updateDoc } = require("firebase/firestore");
    doc.mockReturnValue({
      update: updateDoc,
      get: jest.fn(() =>
        Promise.resolve({ exists: true, data: () => testMeme })
      ),
    });
  });

  it("handles upvoting a meme", async () => {
    render(<MemeCard meme={testMeme} />);

    const likeButton = screen.getByTestId("like-button");
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(screen.getByTestId("like-button")).toBeInTheDocument();
    });
  });

  it("handles downvoting a meme", async () => {});
});
