import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import { EmptyData } from './EmptyData';

describe('EmptyData Component', () => {
  it('renders the component with title', () => {
    const title = 'No Issues Found...';
    render(<EmptyData title={title} />);

    const textElement = screen.getByText(title);
    expect(textElement).toBeInTheDocument();
  });
});
