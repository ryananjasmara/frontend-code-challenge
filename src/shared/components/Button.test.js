import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  let mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick = jest.fn();
  });

  afterEach(() => {
    mockOnClick.mockClear();
  });

  const setup = (props = {}) => {
    const defaultProps = {
      testId: 'test',
      type: 'text',
      title: 'Click Me',
      backgroundColor: 'blue',
      onClick: mockOnClick,
      isDisabled: false,
      ...props
    };
    return render(<Button {...defaultProps} />);
  };

  it('should render the text button correctly', () => {
    setup();
    const button = screen.getByTestId('test.button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click Me');
    expect(button).toHaveClass('button-container blue button-padding-text');
  });

  it('should render the icon button correctly', () => {
    setup({
      type: 'icon',
      icon: <span>Icon</span>,
      backgroundColor: 'red'
    });
    const button = screen.getByTestId('test.button');
    expect(button).toBeInTheDocument();
    expect(button).toContainHTML('<span>Icon</span>');
    expect(button).toHaveClass('button-container red button-padding-icon');
  });

  it('should call onClick when the text button is clicked', () => {
    setup();
    const button = screen.getByTestId('test.button');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should call onClick when the icon button is clicked', () => {
    setup({
      type: 'icon',
      icon: <span>Icon</span>,
      backgroundColor: 'red'
    });
    const button = screen.getByTestId('test.button');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should not call onClick when the text button is disabled', () => {
    setup({ isDisabled: true });
    const button = screen.getByTestId('test.button');
    fireEvent.click(button);
    expect(mockOnClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('should not call onClick when the icon button is disabled', () => {
    setup({
      type: 'icon',
      icon: <span>Icon</span>,
      backgroundColor: 'red',
      isDisabled: true
    });
    const button = screen.getByTestId('test.button');
    fireEvent.click(button);
    expect(mockOnClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });
});
