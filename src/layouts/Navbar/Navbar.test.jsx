import React from "react";
import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import Navbar from ".";
import { AuthProvider, AuthContext, useAuth } from "../../contexts/authContext";

describe("Navbar Component", () => {
  beforeEach(() => {

    render(
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
        </AuthProvider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("Displays a nav bar with 5 links", () => {
    const nav = screen.getByRole("navigation-btns");
    expect(nav).toBeInTheDocument();
    expect(nav.childNodes.length).toBe(7);
  });
});
