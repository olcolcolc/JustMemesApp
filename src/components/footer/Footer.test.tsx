import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Component", () => {
  test("renders footer text correctly", () => {
    render(<Footer />);
    const footerText = screen.getByText(/olcolcolc\. All rights reserved\./i);
    expect(footerText).toBeInTheDocument();
  });
});
