import React from "react";
import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";

import Modal from ".";
import { AuthProvider } from "../../contexts/authContext";
import { BrowserRouter } from "react-router-dom";

describe("Modal Component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Modal />
        </AuthProvider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("Renders overlay", () => {
    const overlay = screen.getByRole("overlay");
    expect(overlay).toBeInTheDocument();
  });

  it("Renders modal", () => {
    const modal = screen.getByRole("modal");
    expect(modal).toBeInTheDocument();
  });

});
