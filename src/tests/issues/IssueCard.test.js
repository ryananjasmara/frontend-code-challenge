import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IssueCard from '@/pages/views/issues/__partials/IssueCard';
import { simpleDateFormat } from '@/shared/utils';

describe('IssueCard Component', () => {
  let mockOnEdit = jest.fn();
  let mockOnRemove = jest.fn();

  beforeEach(() => {
    mockOnEdit = jest.fn();
    mockOnRemove = jest.fn();
  });

  afterEach(() => {
    mockOnEdit.mockClear();
    mockOnRemove.mockClear();
  });

  const setup = (props = {}) => {
    const defaultProps = {
      testId: 'test',
      issueNumber: 123,
      title: 'Test Issue',
      issueDate: '2023-10-01',
      imageUri: 'http://example.com/image.jpg',
      onEdit: mockOnEdit,
      onRemove: mockOnRemove,
      ...props
    };
    return render(<IssueCard {...defaultProps} />);
  };

  it('should render the issue card correctly', () => {
    setup();
    expect(screen.getByTestId('test.issue-card-image')).toBeInTheDocument();
    expect(screen.getByTestId('test.issue-card-title')).toBeInTheDocument();
    expect(screen.getByTestId('test.issue-card-date')).toBeInTheDocument();
    expect(
      screen.getByTestId('test.issue-card-edit-button.button')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('test.issue-card-remove-button.button')
    ).toBeInTheDocument();
  });

  it('should call onEdit when the Edit button is clicked', () => {
    setup();
    fireEvent.click(screen.getByTestId('test.issue-card-edit-button.button'));
    expect(mockOnEdit).toHaveBeenCalled();
  });

  it('should call onRemove when the Remove button is clicked', () => {
    setup();
    fireEvent.click(screen.getByTestId('test.issue-card-remove-button.button'));
    expect(mockOnRemove).toHaveBeenCalled();
  });

  it('should display the correct issue number, title, and date', () => {
    setup();
    expect(screen.getByText('#123')).toBeInTheDocument();
    expect(screen.getByText('Test Issue')).toBeInTheDocument();
    expect(
      screen.getByText(simpleDateFormat('2023-10-01'))
    ).toBeInTheDocument();
  });

  it('should display the correct image', () => {
    setup();
    const image = screen.getByTestId('test.issue-card-image');
    expect(image).toHaveAttribute('src', 'http://example.com/image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Issue');
  });
});
