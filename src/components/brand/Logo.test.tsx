import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("renders an svg with accessible name matching /Agastya/i", () => {
    render(<Logo />);
    expect(screen.getByRole("img", { name: /Agastya/i })).toBeInTheDocument();
  });

  it("renders wordmark 'AGASTYA12343534' when withWordmark is true", () => {
    render(<Logo withWordmark />);
    expect(screen.getByText("AGASTYA12343534")).toBeInTheDocument();
  });

  it("does NOT render wordmark by default", () => {
    render(<Logo />);
    expect(screen.queryByText("AGASTYA12343534")).not.toBeInTheDocument();
  });
});
