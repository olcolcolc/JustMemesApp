import { render, fireEvent, screen } from "@testing-library/react";
import ThemeSwitcher from "./ThemeSwitcher";

describe("ThemeSwitcher component", () => {
  it("toggles between light and dark modes", () => {
    render(<ThemeSwitcher />);

    const button = screen.getByRole("switch");

    // Initial theme should be light
    expect(document.documentElement.getAttribute("color-scheme")).toBe("light");

    // Click the button to switch to dark mode
    fireEvent.click(button);

    // Theme should now be dark
    expect(document.documentElement.getAttribute("color-scheme")).toBe("dark");

    // Click the button again to switch back to light mode
    fireEvent.click(button);

    // Theme should now be light again
    expect(document.documentElement.getAttribute("color-scheme")).toBe("light");
  });
});
