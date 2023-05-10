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
    mockReturnValue({
      user: mockUser,
    });
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

  it("renders welcome message", () => {
    const welcomeMessage = screen.getByText(/long term goals/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  it("renders goal items", () => {
    const goalItems = screen.getAllByRole("listitem");
    expect(goalItems).toHaveLength(mockUser.goals.length);
    mockUser.goals.forEach((goal, index) => {
      expect(goalItems[index]).toHaveTextContent(goal);
    });
  });
});
