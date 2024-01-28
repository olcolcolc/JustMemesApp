import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  test("renders navbar correctly", () => {
    render(<App />);
    const navbarElement = screen.getByTestId("navbar");
    expect(navbarElement).toBeInTheDocument();
  });

  test("renders landing page by default", () => {
    render(<App />);
    const landingPageElement = screen.getByTestId("landingPage");
    expect(landingPageElement).toBeInTheDocument();
  });

  test("opens post new meme modal when button is clicked", () => {
    render(<App />);
    const postNewMemeButton = screen.getByText("+");
    fireEvent.click(postNewMemeButton);
    const postNewMemeModal = screen.getByTestId("postNewMeme");
    expect(postNewMemeModal).toBeInTheDocument();
  });

  test("renders TopPage when Top button is clicked", () => {
    render(<App />);
    const topButton = screen.getByText("Top");
    fireEvent.click(topButton);
    const topPageElement = screen.getByTestId("topPage");
    expect(topPageElement).toBeInTheDocument();
  });

  test("renders RegularPage when Regular button is clicked", () => {
    render(<App />);
    const regularButton = screen.getByText("Regular");
    fireEvent.click(regularButton);
    const regularPageElement = screen.getByTestId("regularPage");
    expect(regularPageElement).toBeInTheDocument();
  });

  test("renders theme switcher button correctly", () => {
    render(<App />);
    const themeSwitcherButton = screen.getByTestId("themeSwitcher__button");
    expect(themeSwitcherButton).toBeInTheDocument();
  });
});
