import React from "react";
import { describe, expect, beforeEach, afterEach, it } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import MeditationList from ".";

describe("MeditationList Component", () => {

  const items = [
    { type: "meditation1", title: "Meditation 1" },
    { type: "meditation2", title: "Meditation 2" },
    { type: "meditation3", title: "Meditation 3" },
  ];

  beforeEach(() => {
    render(<MeditationList items={items}/>);
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the correct number of child elements", () => {
    const meditationList = screen.getAllByRole("meditation-list");
    expect(meditationList[0].children.length).toEqual(items.length);
  });
});
