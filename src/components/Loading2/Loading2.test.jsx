import React from "react";
import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";

import { AuthProvider } from "../../contexts/authContext";
import { BrowserRouter } from "react-router-dom";
import Loading2 from ".";

describe("Loading2 Component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Loading2 />
        </AuthProvider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("Displays a loading div", () => {
    const loading = screen.getByRole("loading");
    expect(loading).toBeInTheDocument();
  });

  it("Displays a loading with 9", () => {
    const loading = screen.getByRole("loading");
    expect(loading).toBeInTheDocument();
    expect(loading.childNodes.length).toBe(9);
  });
});