import { render, screen } from "@testing-library/react";
import Error404 from "./Error404";
import error404img from "../../assets/error404img.svg";

describe("Footer Component", () => {
  test("renders footer text correctly", () => {
    render(<Error404 />);
    const error404div = screen.getByTestId("error404");

    // Check if error404 div is rendered correctly
    expect(error404div).toBeInTheDocument();

    const errorImgElement = screen.getByAltText("error404");

    // Check if error404 image is rendered correctly
    expect(errorImgElement).toBeInTheDocument();
    expect(errorImgElement).toHaveAttribute("src", error404img);
  });
});
