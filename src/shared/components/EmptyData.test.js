import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import { EmptyData } from './EmptyData';

describe('EmptyData Component', () => {
  const setup = (title = '', testId = 'test') => {
    render(<EmptyData title={title} testId={testId} />);
  };

  it('renders the component with title', () => {
    setup('No Data Available');

    expect(screen.getByTestId('test.empty-data-text')).toHaveTextContent('No Data Available');
  });
});
