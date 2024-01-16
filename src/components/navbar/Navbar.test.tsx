import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

describe("Navbar component", () => {
  it("renders navbar correctly", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByAltText("Just Meme logo")).toBeInTheDocument();

    expect(screen.getByText("Top")).toBeInTheDocument();

    expect(screen.getByText("Regular")).toBeInTheDocument();
  });
});
