import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditModal from './EditModal';
import { useGetIssueDetail } from '@/services/queries';
import { generateRandomImage } from '@/shared/utils';

jest.mock('@/services/queries', () => ({
  useGetIssueDetail: jest.fn()
}));

jest.mock('@/shared/utils', () => ({
  generateRandomImage: jest.fn()
}));

describe('EditModal Component', () => {
  let mockOnClose = jest.fn();
  let mockOnEdit = jest.fn();

  beforeEach(() => {
    mockOnClose = jest.fn();
    mockOnEdit = jest.fn();

    useGetIssueDetail.mockReturnValue({
      data: {
        data: {
          title: 'Issue Title',
          issueNumber: 1,
          issueDate: '2023-01-01',
          imageUri: 'http://example.com/image.png'
        }
      },
      isLoading: false
    });

    generateRandomImage.mockReturnValue('http://example.com/random-image.png');
  });

  afterEach(() => {
    mockOnClose.mockClear();
    mockOnEdit.mockClear();
  });

  const setup = (props = {}) => {
    const defaultProps = {
      testId: 'test',
      isOpen: true,
      issueId: '1',
      onClose: mockOnClose,
      onEdit: mockOnEdit,
      ...props
    };
    return render(<EditModal {...defaultProps} />);
  };

  it('should render the modal correctly when open', () => {
    setup();
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
    expect(screen.getByTestId('test.edit-button.button')).toBeInTheDocument();
  });

  it('should render the modal with skeleton loaders when loading', () => {
    useGetIssueDetail.mockReturnValue({
      data: null,
      isLoading: true
    });

    setup();

    expect(
      document.querySelector('.edit-modal-skeleton-header')
    ).toBeInTheDocument();
    expect(
      document.querySelector('.edit-modal-skeleton-textfield')
    ).toBeInTheDocument();
    expect(
      document.querySelector('.edit-modal-skeleton-image')
    ).toBeInTheDocument();
  });

  it('should not render the modal when closed', () => {
    setup({ isOpen: false });
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
      screen.queryByTestId('test.edit-button.button')
    ).not.toBeInTheDocument();
  });

  it('should call onClose when the Close button is clicked', () => {
    setup();
    fireEvent.click(screen.getByTestId('test.close-button.button'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should call onEdit when the Edit button is clicked', () => {
    setup();
    fireEvent.change(
      screen.getByTestId('test.title-textfield.textfield-input'),
      {
        target: { value: 'Updated Issue' }
      }
    );
    fireEvent.change(
      screen.getByTestId('test.issue-number-textfield.textfield-input'),
      {
        target: { value: '2' }
      }
    );
    fireEvent.change(
      screen.getByTestId('test.issue-date-datepicker.datepicker-input'),
      {
        target: { value: '2023-01-02' }
      }
    );
    fireEvent.change(
      screen.getByTestId('test.image-uri-textfield.textfield-input'),
      {
        target: { value: 'http://example.com/updated-image.png' }
      }
    );
    fireEvent.click(screen.getByTestId('test.edit-button.button'));
    expect(mockOnEdit).toHaveBeenCalled();
  });

  it('should disable the Edit button if required fields are missing', () => {
    useGetIssueDetail.mockReturnValue({
      data: {
        data: {
          title: 'Issue Title',
          issueNumber: 1,
          issueDate: '',
          imageUri: ''
        }
      },
      isLoading: false
    });

    setup();
    expect(screen.getByTestId('test.edit-button.button')).toBeDisabled();
  });

  it('should enable the Edit button if all required fields are filled', () => {
    setup();
    fireEvent.change(
      screen.getByTestId('test.title-textfield.textfield-input'),
      {
        target: { value: 'Updated Issue' }
      }
    );
    fireEvent.change(
      screen.getByTestId('test.issue-number-textfield.textfield-input'),
      {
        target: { value: '2' }
      }
    );
    fireEvent.change(
      screen.getByTestId('test.issue-date-datepicker.datepicker-input'),
      {
        target: { value: '2023-01-02' }
      }
    );
    fireEvent.change(
      screen.getByTestId('test.image-uri-textfield.textfield-input'),
      {
        target: { value: 'http://example.com/updated-image.png' }
      }
    );
    expect(screen.getByTestId('test.edit-button.button')).not.toBeDisabled();
  });

  it('should generate a new image URI when the Generate Image button is clicked', () => {
    setup();
    fireEvent.click(screen.getByTestId('test.generate-image-button.button'));
    expect(
      screen.getByTestId('test.image-uri-textfield.textfield-input').value
    ).toBe('http://example.com/random-image.png');
  });
});
