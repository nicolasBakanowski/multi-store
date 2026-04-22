import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

function Hello() {
  return <span>multistore</span>;
}

describe("smoke", () => {
  it("renders", () => {
    render(<Hello />);
    expect(screen.getByText("multistore")).toBeInTheDocument();
  });
});
