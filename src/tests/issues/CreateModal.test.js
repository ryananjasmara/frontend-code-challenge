import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateModal from '@/pages/views/issues/__partials/CreateModal';
import { generateRandomImage } from '@/shared/utils';

jest.mock('@/shared/utils', () => ({
  generateRandomImage: jest.fn()
}));

describe('CreateModal Component', () => {
  let mockOnClose = jest.fn();
  let mockOnCreate = jest.fn();

  beforeEach(() => {
    mockOnClose = jest.fn();
    mockOnCreate = jest.fn();
    generateRandomImage.mockReturnValue('http://example.com/random-image.png');
  });

  afterEach(() => {
    mockOnClose.mockClear();
    mockOnCreate.mockClear();
  });

  const setup = (props = {}) => {
    const defaultProps = {
      testId: 'test',
      isOpen: true,
      onClose: mockOnClose,
      onCreate: mockOnCreate,
      ...props
    };
    return render(<CreateModal {...defaultProps} />);
  };

  it('should render the modal correctly when open', () => {
    setup();
    expect(screen.getByTestId('test.modal-title')).toBeInTheDocument();
    expect(
      screen.getByTestId('test.title-textfield.textfield-input')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('test.issue-number-textfield.textfield-input')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('test.issue-date-datepicker.datepicker-input')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('test.image-uri-textfield.textfield-input')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('test.generate-image-button.button')
    ).toBeInTheDocument();
    expect(screen.getByTestId('test.close-button.button')).toBeInTheDocument();
    expect(screen.getByTestId('test.create-button.button')).toBeInTheDocument();
  });

  it('should not render the modal when closed', () => {
    setup({ isOpen: false });
    expect(screen.queryByTestId('test.modal-title')).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('test.title-textfield.textfield-input')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('test.issue-number-textfield.textfield-input')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('test.issue-date-datepicker.datepicker-input')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('test.image-uri-textfield.textfield-input')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('test.generate-image-button.button')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('test.close-button.button')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('test.create-button.button')
    ).not.toBeInTheDocument();
  });

  it('should call onClose when the Close button is clicked', () => {
    setup();
    fireEvent.click(screen.getByTestId('test.close-button.button'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should call onCreate when the Create button is clicked', () => {
    setup();
    fireEvent.change(
      screen.getByTestId('test.title-textfield.textfield-input'),
      {
        target: { value: 'New Issue' }
      }
    );
    fireEvent.change(
      screen.getByTestId('test.issue-number-textfield.textfield-input'),
      {
        target: { value: '1' }
      }
    );
    fireEvent.change(
      screen.getByTestId('test.issue-date-datepicker.datepicker-input'),
      {
        target: { value: '2023-01-01' }
      }
    );
    fireEvent.change(
      screen.getByTestId('test.image-uri-textfield.textfield-input'),
      {
        target: { value: 'http://example.com/image.png' }
      }
    );
    fireEvent.click(screen.getByTestId('test.create-button.button'));
    expect(mockOnCreate).toHaveBeenCalled();
  });

  it('should disable the Create button if required fields are missing', () => {
    setup();
    expect(screen.getByTestId('test.create-button.button')).toBeDisabled();
  });

  it('should enable the Create button if all required fields are filled', () => {
    setup();
    fireEvent.change(
      screen.getByTestId('test.title-textfield.textfield-input'),
      {
        target: { value: 'New Issue' }
      }
    );
    fireEvent.change(
      screen.getByTestId('test.issue-number-textfield.textfield-input'),
      {
        target: { value: '1' }
      }
    );
    fireEvent.change(
      screen.getByTestId('test.issue-date-datepicker.datepicker-input'),
      {
        target: { value: '2023-01-01' }
      }
    );
    fireEvent.change(
      screen.getByTestId('test.image-uri-textfield.textfield-input'),
      {
        target: { value: 'http://example.com/image.png' }
      }
    );
    expect(screen.getByTestId('test.create-button.button')).not.toBeDisabled();
  });

  it('should generate a new image URI when the Generate Image button is clicked', () => {
    setup();
    fireEvent.click(screen.getByTestId('test.generate-image-button.button'));
    expect(
      screen.getByTestId('test.image-uri-textfield.textfield-input').value
    ).toBe('http://example.com/random-image.png');
  });
});
