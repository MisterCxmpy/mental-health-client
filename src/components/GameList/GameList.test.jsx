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
    
})
