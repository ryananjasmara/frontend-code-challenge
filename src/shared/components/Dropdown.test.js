import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from './Dropdown';

describe('Dropdown Component', () => {
  const mockOnChange = jest.fn();
  const items = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' }
  ];

  const setup = (props = {}) => {
    const defaultProps = {
      testId: 'test',
      value: '',
      onChange: mockOnChange,
      items: items,
      defaultOption: 'Select an option',
      label: 'Dropdown Label',
      ...props
    };
    return render(<Dropdown {...defaultProps} />);
  };

  it('should render the dropdown label correctly', () => {
    setup();
    expect(screen.getByTestId('test.dropdown-label')).toBeInTheDocument();
    expect(screen.getByText('Dropdown Label')).toBeInTheDocument();
  });

  it('should render the default option correctly', () => {
    setup();
    expect(
      screen.getByTestId('test.dropdown-select.default-option')
    ).toBeInTheDocument();
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('should render the items correctly', () => {
    setup();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('should call onChange when an option is selected', () => {
    setup();
    fireEvent.change(screen.getByTestId('test.dropdown-select'), {
      target: { value: '1' }
    });
    expect(mockOnChange).toHaveBeenCalledWith('1');
  });

  it('should set the selected value correctly', () => {
    setup({ value: '2' });
    expect(screen.getByTestId('test.dropdown-select')).toHaveValue('2');
  });
});
