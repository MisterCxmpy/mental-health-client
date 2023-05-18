import React from 'react';
import { describe, expect, beforeEach, afterEach, it } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
 
import matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

import MeditationModal from '.';

describe('MeditationModal Component', () => {
  beforeEach(() => {
  render(
    <BrowserRouter>
      <MeditationModal />
    </BrowserRouter>,
  )
  })
  
  afterEach(() => {
      cleanup();
  })

  it("Displays Meditation div", () => {
      const content = screen.getByRole('content')
      expect(content).toBeInTheDocument();
  })

  it('displays user choose times component initially', () => {
    expect(screen.getByRole('heading', { name: 'How long would you like to meditate?' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '5 mins' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '10 mins' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '15 mins' })).toBeInTheDocument();
  });

    
})
