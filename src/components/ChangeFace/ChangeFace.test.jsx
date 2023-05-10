import React from "react";
import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";

import { AuthProvider } from "../../contexts/authContext";
import { BrowserRouter } from "react-router-dom";
import ChangeFace from ".";

describe("ChangeFace Component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ChangeFace />
        </AuthProvider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("should change the face on mouseover", () => {
    const faceEl = screen.getByRole("face");
    expect(faceEl).toBeInTheDocument();

    fireEvent.mouseOver(faceEl);

    const newFaceEl = screen.getByRole("face");
    expect(newFaceEl).toBeInTheDocument();
    expect(newFaceEl.textContent).not.toBe(faceEl.textContent);
  });
});