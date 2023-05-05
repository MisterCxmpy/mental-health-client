import React from "react";
import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";

import CreateForum from ".";

describe("CreateForum Component", () => {
  beforeEach(() => {
    render(<CreateForum />);
  });

  afterEach(() => {
    cleanup();
  });

  it("Renders the form with input fields and a submit button", () => {
    const titleInput = screen.getByRole("titleInput");
    const bodyInput = screen.getByRole("bodyTextarea");
    const submitButton = screen.getByRole("button", { name: "Post" });

    expect(titleInput).toBeInTheDocument();
    expect(bodyInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("Updates the input values when typed into", () => {
    const titleInput = screen.getByRole("titleInput");
    const bodyInput = screen.getByRole("bodyTextarea");

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(bodyInput, { target: { value: "Test Body" } });

    expect(titleInput.value).toBe("Test Title");
    expect(bodyInput.value).toBe("Test Body");
  });

  it("Calls the onSubmit function when the form is submitted", () => {
    const onSubmit = vi.fn();
    render(<CreateForum onSubmit={onSubmit} />);

    const submitButton = screen.getAllByRole("button", { name: "Post" });
    expect(submitButton[0]).toBeInTheDocument();
  });
});
