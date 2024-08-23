import React from 'react';
import { render, screen } from '@testing-library/react';
import { Toast } from './Toast';

describe('Toast Component', () => {
  const setup = (message, type) => {
    render(<Toast message={message} type={type} />);
  };

  it('should render the toast message correctly', () => {
    setup('Test Message', null);
    expect(screen.getByTestId('toast-global')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('should apply the correct class for success type', () => {
    setup('Success Message', 'success');
    expect(screen.getByTestId('toast-global')).toHaveClass('toast-success');
  });

  it('should apply the correct class for warning type', () => {
    setup('Warning Message', 'warning');
    expect(screen.getByTestId('toast-global')).toHaveClass('toast-warning');
  });

  it('should apply the correct class for error type', () => {
    setup('Error Message', 'error');
    expect(screen.getByTestId('toast-global')).toHaveClass('toast-error');
  });

  it('should apply the default class when type is null', () => {
    setup('Default Message', null);
    expect(screen.getByTestId('toast-global')).toHaveClass('toast-default');
  });
});
