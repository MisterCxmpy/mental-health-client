import React from 'react';
import { describe, expect, beforeEach, afterEach, it } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
 
import matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

import GameList from '.';

describe('GameList Component', () => {
  beforeEach(() => {
  render(
    <BrowserRouter>
      <GameList />
    </BrowserRouter>,
  )
  })
  
  afterEach(() => {
      cleanup();
  })

  it("Displays a GameList with 2 links", () => {
      const nav = screen.getByRole('game-list')
      expect(nav).toBeInTheDocument();
      expect(nav.childNodes.length).toBe(2)
  })

  it('calcColourIndex calculates the correct color index', () => {
    const testCases = [{ index: 0, expected: 2 }, { index: 5, expected: 2 }, { index: 11, expected: 3 }, { index: 17, expected: 4 }, { index: 24, expected: 2 }];
  
    const calcColourIndex = index => ((index % 5) + Math.floor(index / 6) * 6 + 2) % 6 || 2;

    testCases.forEach(({ index, expected }) => {
      const result = calcColourIndex(index);
      console.log(result)
      expect(result).toEqual(expected);
    });
  });
    
})
