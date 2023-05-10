import React from "react";
import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { AuthProvider, useAuth } from "../../contexts/authContext";
import { BrowserRouter } from "react-router-dom";
import UserStats from ".";

describe("UserStats Component", () => {
  const mockUser = {
    goals: ["goal 1", "goal 2"],
  };
  
  beforeEach(() => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <UserStats />
        </AuthProvider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("Renders heading", () => {
    console.log(mockUser)
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });

  it("Renders heading content", () => {
    const headingContent = screen.getByRole("heading-content");
    expect(headingContent).toBeInTheDocument();
  });

  it("Renders welcome message", () => {
    const welcomeMessage = screen.getByRole("welcome-message");
    expect(welcomeMessage).toBeInTheDocument();
  });

  it("Renders welcome message", () => {
    const welcomeMessage = screen.getByRole("welcome-message");
    expect(welcomeMessage.textContent).toBe("Long Term Goals")
  });

});
