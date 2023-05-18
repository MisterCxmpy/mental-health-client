import React from 'react';
import { describe, expect, beforeEach, afterEach, it } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
 
import matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

import Meditation from '.';

describe('Meditation Component', () => {
  beforeEach(() => {
  render(
    <BrowserRouter>
      <Meditation />
    </BrowserRouter>,
  )
  })
  
  afterEach(() => {
      cleanup();
  })

  it("Displays Meditation div", () => {
      const meditation = screen.getByRole('meditation')
      expect(meditation).toBeInTheDocument();
  })

  it("Displays Play Button div", () => {
      const playBtn = screen.getByRole('play-btn')
      expect(playBtn).toBeInTheDocument();
  })

  it("Displays Meditation div with 2 children", () => {
      const meditation = screen.getByRole('meditation')
      expect(meditation).toBeInTheDocument();
      expect(meditation.childNodes.length).toBe(2)
  })

    
})
