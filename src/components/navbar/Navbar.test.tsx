import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar";

describe("Navbar component", () => {
  it("renders correctly", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    expect(screen.getByAltText("Just Meme logo")).toBeInTheDocument();
    expect(screen.getByText("Top")).toBeInTheDocument();
    expect(screen.getByText("Regular")).toBeInTheDocument();
  });

  it("navigates to correct routes", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    expect(screen.getByText("Top")).toHaveAttribute("href", "/top");
    expect(screen.getByText("Regular")).toHaveAttribute("href", "/regular");
  });
});
