import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterModal from './FilterModal';

describe('FilterModal Component', () => {
  let mockOnClose = jest.fn();
  let mockOnConfirm = jest.fn();
  let mockOnReset = jest.fn();

  beforeEach(() => {
    mockOnClose = jest.fn();
    mockOnConfirm = jest.fn();
    mockOnReset = jest.fn();
  });

  afterEach(() => {
    mockOnClose.mockClear();
    mockOnConfirm.mockClear();
    mockOnReset.mockClear();
  });

  const setup = (props = {}) => {
    const defaultProps = {
      testId: 'test',
      isOpen: true,
      onClose: mockOnClose,
      onConfirm: mockOnConfirm,
      onReset: mockOnReset,
      filterSortBy: 'issueNumber',
      filterOrder: 'ascending',
      ...props
    };
    return render(<FilterModal {...defaultProps} />);
  };

  it('should render the modal correctly when open', () => {
    setup();
    expect(
      screen.getByTestId('test.sort-by-dropdown.dropdown-label')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('test.sort-by-dropdown.dropdown-select')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('test.order-dropdown.dropdown-label')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('test.order-dropdown.dropdown-select')
    ).toBeInTheDocument();
    expect(screen.getByTestId('test.apply-button.button')).toBeInTheDocument();
    expect(screen.getByTestId('test.close-button.button')).toBeInTheDocument();
    expect(screen.getByTestId('test.reset-button.button')).toBeInTheDocument();
  });

  it('should not render the modal when closed', () => {
    setup({ isOpen: false });
    expect(
      screen.queryByTestId('test.sort-by-dropdown.dropdown-label')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('test.sort-by-dropdown.dropdown-select')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('test.order-dropdown.dropdown-label')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('test.order-dropdown.dropdown-select')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('test.apply-button.button')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('test.close-button.button')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('test.reset-button.button')
    ).not.toBeInTheDocument();
  });

  it('should call onClose when the Close button is clicked', () => {
    setup();
    fireEvent.click(screen.getByTestId('test.close-button.button'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should call onConfirm when the Apply button is clicked', () => {
    setup();
    fireEvent.click(screen.getByTestId('test.apply-button.button'));
    expect(mockOnConfirm).toHaveBeenCalledWith({
      sortBy: 'issueNumber',
      order: 'ascending'
    });
  });

  it('should call handleResetFilter when the Reset button is clicked', () => {
    setup();
    fireEvent.click(screen.getByTestId('test.reset-button.button'));
    expect(
      screen.getByTestId('test.sort-by-dropdown.dropdown-select').value
    ).toBe('');
    expect(
      screen.getByTestId('test.order-dropdown.dropdown-select').value
    ).toBe('');
  });

  it('should update sortBy when a new sort option is selected', () => {
    setup();
    fireEvent.change(
      screen.getByTestId('test.sort-by-dropdown.dropdown-select'),
      {
        target: { value: 'title' }
      }
    );
    expect(
      screen.getByTestId('test.sort-by-dropdown.dropdown-select').value
    ).toBe('title');
  });

  it('should update order when a new order option is selected', () => {
    setup();
    fireEvent.change(
      screen.getByTestId('test.order-dropdown.dropdown-select'),
      {
        target: { value: 'descending' }
      }
    );
    expect(
      screen.getByTestId('test.order-dropdown.dropdown-select').value
    ).toBe('descending');
  });
});
