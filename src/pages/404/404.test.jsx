import React from "react";
import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";

import { AuthProvider } from "../../contexts/authContext";
import { BrowserRouter } from "react-router-dom";
import ErrorPage from ".";

describe("404 Component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ErrorPage />
        </AuthProvider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("Renders error", () => {
    const error = screen.getByRole("404");
    expect(error).toBeInTheDocument();
  });

  it("Renders heading", () => {
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });

});
