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

  it("Renders Marketplace List with Items", () => {
    const mockItems = [
      { name: "Test Item 1", price: 100, category: "Test Category 1" },
      { name: "Test Item 2", price: 200, category: "Test Category 2" },
      { name: "Test Item 3", price: 300, category: "Test Category 3" },
    ];

    render(<MarketplaceList items={mockItems} />);

    const itemList = screen.getAllByRole("marketplace-list");
    expect(itemList[0]).toBeInTheDocument();

    const itemElements = screen.getAllByRole("item");
    expect(itemElements.length).toBe(mockItems.length);

    itemElements.forEach((itemElement, index) => {
      const itemProps = mockItems[index];
      const itemName = screen.getByText(itemProps.name);
      const itemCategory = screen.getByText(itemProps.category);
      const itemPrice = screen.getByText(
        `${itemProps.price.toLocaleString("en-US")} Dabloons`
      );

      expect(itemElement).toBeInTheDocument();
      expect(itemName).toBeInTheDocument();
      expect(itemCategory).toBeInTheDocument();
      expect(itemPrice).toBeInTheDocument();
    });
  });
});
