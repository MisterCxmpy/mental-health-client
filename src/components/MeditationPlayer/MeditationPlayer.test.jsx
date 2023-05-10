import React from "react";
import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { AuthProvider } from "../../contexts/authContext";
import { BrowserRouter } from "react-router-dom";
import MeditationPlayer from ".";

describe("MeditationPlayer Component", () => {
  
  beforeEach(() => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <MeditationPlayer />
        </AuthProvider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the component", () => {
    expect(screen.getByRole("music-player")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByRole("input-btn")).toBeInTheDocument();
  });

});
