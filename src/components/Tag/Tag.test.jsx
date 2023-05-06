import React from "react";
import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";

import Tag from ".";
import { AuthProvider } from "../../contexts/authContext";
import { BrowserRouter } from "react-router-dom";

describe("CreateForum Component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Tag />
        </AuthProvider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("Renders tag", () => {
    const tag = screen.getByRole('tag')
    expect(tag).toBeInTheDocument();
  });
});
