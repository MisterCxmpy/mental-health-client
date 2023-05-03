import React from 'react';
import { describe, expect, beforeEach, afterEach, it } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
 
import matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

import MeditationList from '.';

describe('MeditationList Component', () => {
    beforeEach(() => {
        render(
          <MeditationList />
        )
    })
    
    afterEach(() => {
        cleanup();
    })

    it("Displays a MeditationList with 5 links", () => {
        const nav = screen.getByRole('meditation-list')
        expect(nav).toBeInTheDocument();
        expect(nav.childNodes.length).toBe(5)
    })
    
})
