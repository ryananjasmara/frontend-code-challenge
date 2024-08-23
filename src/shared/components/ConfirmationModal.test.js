import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmationModal } from './ConfirmationModal';

describe('ConfirmationModal Component', () => {
  let mockOnConfirm = jest.fn();
  let mockOnCancel = jest.fn();

  beforeEach(() => {
    mockOnConfirm = jest.fn();
    mockOnCancel = jest.fn();
  });

  afterEach(() => {
    mockOnConfirm.mockClear();
    mockOnCancel.mockClear();
  });

  const setup = (props = {}) => {
    const defaultProps = {
      testId: 'test',
      title: 'Are you sure?',
      description: 'This action cannot be undone.',
      onConfirm: mockOnConfirm,
      onCancel: mockOnCancel,
      confirmButtonLabel: 'Confirm',
      cancelButtonLabel: 'Cancel',
      isOpen: true,
      ...props
    };
    return render(<ConfirmationModal {...defaultProps} />);
  };

  it('should render the modal correctly when open', () => {
    setup();
    expect(
      screen.getByTestId('test.confirmation-modal-title')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('test.confirmation-modal-description')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('test.confirmation-modal-confirm-button-cancel.button')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('test.confirmation-modal-confirm-button-confirm.button')
    ).toBeInTheDocument();
  });

  it('should not render the modal when closed', () => {
    setup({ isOpen: false });
    expect(
      screen.queryByTestId('test.confirmation-modal-title')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('test.confirmation-modal-description')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('test.confirmation-modal-confirm-button-cancel.button')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('test.confirmation-modal-confirm-button-confirm.button')
    ).not.toBeInTheDocument();
  });

  it('should call onConfirm when the confirm button is clicked', () => {
    setup();
    const confirmButton = screen.getByTestId(
      'test.confirmation-modal-confirm-button-confirm.button'
    );
    fireEvent.click(confirmButton);
    expect(mockOnConfirm).toHaveBeenCalled();
  });

  it('should call onCancel when the cancel button is clicked', () => {
    setup();
    const cancelButton = screen.getByTestId(
      'test.confirmation-modal-confirm-button-cancel.button'
    );
    fireEvent.click(cancelButton);
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('should display the correct title and description', () => {
    setup();
    expect(
      screen.getByTestId('test.confirmation-modal-title')
    ).toHaveTextContent('Are you sure?');
    expect(
      screen.getByTestId('test.confirmation-modal-description')
    ).toHaveTextContent('This action cannot be undone.');
  });

  it('should display the correct button labels', () => {
    setup();
    expect(
      screen.getByTestId('test.confirmation-modal-confirm-button-confirm.button')
    ).toHaveTextContent('Confirm');
    expect(
      screen.getByTestId('test.confirmation-modal-confirm-button-cancel.button')
    ).toHaveTextContent('Cancel');
  });
});
