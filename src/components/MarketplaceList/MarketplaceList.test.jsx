import React from "react";
import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";

import { AuthProvider } from "../../contexts/authContext";
import { BrowserRouter } from "react-router-dom";
import MarketplaceList from ".";

describe("CreateForum Component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <MarketplaceList />
        </AuthProvider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("Renders Item", () => {
    const item = screen.getByRole('item')
    expect(item).toBeInTheDocument();
  });

  it("Renders Image", () => {
    const itemImg = screen.getByRole('item-img')
    expect(itemImg).toBeInTheDocument();
  });

  it("Renders Content", () => {
    const content = screen.getByRole('content')
    expect(content).toBeInTheDocument();
  });
});
