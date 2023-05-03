import React from 'react';
import { describe, expect, beforeEach, afterEach, it } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
 
import matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

import Navbar from '.';

describe('Navbar Component', () => {
    beforeEach(() => {
        render(
          <BrowserRouter>
              <Navbar />
          </BrowserRouter>
        )
    })
    
    afterEach(() => {
        cleanup();
    })

    it("Displays a nav bar with 5 links", () => {
        const nav = screen.getByRole('navigation-btns')
        expect(nav).toBeInTheDocument();
        expect(nav.childNodes.length).toBe(7)
    })
    
})
