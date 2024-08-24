import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IssuesPage from './Issues';
import ToastProvider from '@/contexts/Toast.context';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  useGetIssues,
  useDeleteIssue,
  useCreateIssue,
  useUpdateIssue,
  useGetIssueDetail
} from '@/services/queries';

jest.mock('@/services/queries', () => ({
  useGetIssues: jest.fn(),
  useDeleteIssue: jest.fn(),
  useCreateIssue: jest.fn(),
  useUpdateIssue: jest.fn(),
  useGetIssueDetail: jest.fn()
}));

const queryClient = new QueryClient();

const setup = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <IssuesPage />
      </ToastProvider>
    </QueryClientProvider>
  );
};

describe('IssuesPage Component', () => {
  beforeEach(() => {
    useGetIssues.mockReset();
    useDeleteIssue.mockReset();
    useCreateIssue.mockReset();
    useUpdateIssue.mockReset();

    useGetIssues.mockReturnValue({
      data: {
        data: [],
        meta: {
          page: 1,
          limit: 10,
          total: 0,
          totalPage: 0
        }
      },
      isLoading: false,
      isError: false
    });

    useDeleteIssue.mockReturnValue({
      mutate: jest.fn(),
      isSuccess: false
    });

    useCreateIssue.mockReturnValue({
      mutate: jest.fn(),
      isSuccess: false
    });

    useUpdateIssue.mockReturnValue({
      mutate: jest.fn(),
      isSuccess: false
    });

    useGetIssueDetail.mockReturnValue({
      data: null,
      isLoading: false
    });
  });

  it('should render the IssuesPage component correctly', () => {
    setup();
    expect(screen.getByTestId('issues-page.page-title')).toBeInTheDocument();
    expect(
      screen.getByTestId('issues-page.create-issue-button.button')
    ).toBeInTheDocument();
    expect(screen.getByTestId('issues-page.search-input')).toBeInTheDocument();
    expect(
      screen.getByTestId('issues-page.filter-button.button')
    ).toBeInTheDocument();
  });

  it('should render the IssuePage with loading state', () => {
    useGetIssues.mockReturnValue({
      data: {
        data: [],
        meta: {
          page: 1,
          limit: 10,
          total: 0,
          totalPage: 0
        }
      },
      isLoading: true,
      isError: false
    });

    setup();

    expect(
      document.querySelector('.issue-card-skeleton-badge')
    ).toBeInTheDocument();
    expect(
      document.querySelector('.issue-card-skeleton-image-placeholder')
    ).toBeInTheDocument();
    expect(
      document.querySelector('.issue-card-skeleton-content')
    ).toBeInTheDocument();
    expect(
      document.querySelector('.issue-card-skeleton-text-placeholder')
    ).toBeInTheDocument();
    expect(
      document.querySelector('.issue-card-skeleton-icon-group')
    ).toBeInTheDocument();
    expect(
      document.querySelector('.issue-card-skeleton-icon-placeholder')
    ).toBeInTheDocument();
  });

  it('should update the search input value', () => {
    setup();
    const searchInput = screen.getByTestId('issues-page.search-input');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput.value).toBe('test');
  });

  it('should apply the filter', () => {
    setup();
    const filterButton = screen.getByTestId('issues-page.filter-button.button');
    fireEvent.click(filterButton);
    expect(
      screen.getByTestId(
        'issues-page.filter-modal.sort-by-dropdown.dropdown-label'
      )
    ).toBeInTheDocument();

    fireEvent.change(
      screen.getByTestId(
        'issues-page.filter-modal.sort-by-dropdown.dropdown-select'
      ),
      {
        target: { value: 'title' }
      }
    );
    fireEvent.click(
      screen.getByTestId('issues-page.filter-modal.apply-button.button')
    );
    expect(
      screen.queryByTestId(
        'issues-page.filter-modal.sort-by-dropdown.dropdown-label'
      )
    ).not.toBeInTheDocument();
  });

  it('should navigate to the next page when the next button is clicked and navigate to the previous page when the previous button is clicked', () => {
    useGetIssues.mockReturnValue({
      data: {
        data: [
          {
            _id: 1,
            title: 'Test Issue 1',
            description: 'Test Description 1',
            status: 'open'
          },
          {
            _id: 2,
            title: 'Test Issue 2',
            description: 'Test Description 2',
            status: 'open'
          },
          {
            _id: 3,
            title: 'Test Issue 3',
            description: 'Test Description 3',
            status: 'open'
          },
          {
            _id: 4,
            title: 'Test Issue 4',
            description: 'Test Description 4',
            status: 'open'
          },
          {
            _id: 5,
            title: 'Test Issue 5',
            description: 'Test Description 5',
            status: 'open'
          },
          {
            _id: 6,
            title: 'Test Issue 6',
            description: 'Test Description 6',
            status: 'open'
          },
          {
            _id: 7,
            title: 'Test Issue 7',
            description: 'Test Description 7',
            status: 'open'
          },
          {
            _id: 8,
            title: 'Test Issue 8',
            description: 'Test Description 8',
            status: 'open'
          },
          {
            _id: 9,
            title: 'Test Issue 9',
            description: 'Test Description 9',
            status: 'open'
          },
          {
            _id: 10,
            title: 'Test Issue 10',
            description: 'Test Description 10',
            status: 'open'
          }
        ],
        meta: {
          page: 1,
          limit: 10,
          total: 12,
          totalPage: 2
        }
      },
      isLoading: false,
      isError: false
    });

    setup();
    const nextButton = screen.getByTestId(
      'issues-page.next-page-button.button'
    );
    fireEvent.click(nextButton);
    useGetIssues.mockReturnValue({
      data: {
        data: [
          {
            _id: 11,
            title: 'Test Issue 11',
            description: 'Test Description 11',
            status: 'open'
          },
          {
            _id: 12,
            title: 'Test Issue 12',
            description: 'Test Description 12',
            status: 'open'
          }
        ],
        meta: {
          page: 2,
          limit: 10,
          total: 12,
          totalPage: 2
        }
      },
      isLoading: false,
      isError: false
    });
    expect(screen.getByTestId('issues-page.pagination-text').textContent).toBe(
      'Page 2 of 2'
    );
    const prevButton = screen.getByTestId(
      'issues-page.previous-page-button.button'
    );
    fireEvent.click(prevButton);
    useGetIssues.mockReturnValue({
      data: {
        data: [
          {
            _id: 1,
            title: 'Test Issue 1',
            description: 'Test Description 1',
            status: 'open'
          },
          {
            _id: 2,
            title: 'Test Issue 2',
            description: 'Test Description 2',
            status: 'open'
          },
          {
            _id: 3,
            title: 'Test Issue 3',
            description: 'Test Description 3',
            status: 'open'
          },
          {
            _id: 4,
            title: 'Test Issue 4',
            description: 'Test Description 4',
            status: 'open'
          },
          {
            _id: 5,
            title: 'Test Issue 5',
            description: 'Test Description 5',
            status: 'open'
          },
          {
            _id: 6,
            title: 'Test Issue 6',
            description: 'Test Description 6',
            status: 'open'
          },
          {
            _id: 7,
            title: 'Test Issue 7',
            description: 'Test Description 7',
            status: 'open'
          },
          {
            _id: 8,
            title: 'Test Issue 8',
            description: 'Test Description 8',
            status: 'open'
          },
          {
            _id: 9,
            title: 'Test Issue 9',
            description: 'Test Description 9',
            status: 'open'
          },
          {
            _id: 10,
            title: 'Test Issue 10',
            description: 'Test Description 10',
            status: 'open'
          }
        ],
        meta: {
          page: 1,
          limit: 10,
          total: 12,
          totalPage: 2
        }
      },
      isLoading: false,
      isError: false
    });
    expect(screen.getByTestId('issues-page.pagination-text').textContent).toBe(
      'Page 1 of 2'
    );
  });

  it('should call useDeleteIssue when deleting an issue', () => {
    useGetIssues.mockReturnValue({
      data: {
        data: [
          {
            _id: 1,
            title: 'Test Issue',
            description: 'Test Description',
            status: 'open'
          }
        ],
        meta: {
          page: 1,
          limit: 10,
          total: 1,
          totalPage: 1
        }
      },
      isLoading: false,
      isError: false
    });

    const mockDeleteIssue = jest.fn();
    useDeleteIssue.mockReturnValue({
      mutate: mockDeleteIssue,
      isSuccess: false
    });

    setup();

    // open the delete modal
    const deleteButton = screen.getByTestId(
      'issues-page.issue-card0.issue-card-remove-button.button'
    );
    fireEvent.click(deleteButton);
    expect(
      screen.getByTestId('issues-page.delete-modal.confirmation-modal-title')
    ).toBeInTheDocument();

    // submit the delete
    const submitDeleteButton = screen.getByTestId(
      'issues-page.delete-modal.confirmation-modal-confirm-button-confirm.button'
    );
    fireEvent.click(submitDeleteButton);

    expect(mockDeleteIssue).toHaveBeenCalled();
  });

  it('should call useCreateIssue when creating an issue', () => {
    useGetIssues.mockReturnValue({
      data: {
        data: [
          {
            _id: 1,
            title: 'Test Issue',
            description: 'Test Description',
            status: 'open'
          }
        ],
        meta: {
          page: 1,
          limit: 10,
          total: 1,
          totalPage: 1
        }
      },
      isLoading: false,
      isError: false
    });

    const mockCreateIssue = jest.fn();
    useCreateIssue.mockReturnValue({
      mutate: mockCreateIssue,
      isSuccess: false
    });

    setup();

    // open the create modal
    const createButton = screen.getByTestId(
      'issues-page.create-issue-button.button'
    );
    fireEvent.click(createButton);

    // fill in the form fields
    fireEvent.change(
      screen.getByTestId(
        'issues-page.create-modal.title-textfield.textfield-input'
      ),
      {
        target: { value: 'New Issue' }
      }
    );
    fireEvent.change(
      screen.getByTestId(
        'issues-page.create-modal.issue-number-textfield.textfield-input'
      ),
      {
        target: { value: '1' }
      }
    );
    fireEvent.change(
      screen.getByTestId(
        'issues-page.create-modal.issue-date-datepicker.datepicker-input'
      ),
      {
        target: { value: '2023-01-01' }
      }
    );
    fireEvent.change(
      screen.getByTestId(
        'issues-page.create-modal.image-uri-textfield.textfield-input'
      ),
      {
        target: { value: 'http://example.com/image.png' }
      }
    );

    // submit the form
    const submitCreateButton = screen.getByTestId(
      'issues-page.create-modal.create-button.button'
    );
    fireEvent.click(submitCreateButton);
    expect(mockCreateIssue).toHaveBeenCalled();
  });

  it('should call useUpdateIssue when updating an issue', () => {
    useGetIssues.mockReturnValue({
      data: {
        data: [
          {
            _id: 1,
            title: 'Test Issue',
            description: 'Test Description',
            status: 'open'
          }
        ],
        meta: {
          page: 1,
          limit: 10,
          total: 1,
          totalPage: 1
        }
      },
      isLoading: false,
      isError: false
    });

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

    const mockUpdateIssue = jest.fn();
    useUpdateIssue.mockReturnValue({
      mutate: mockUpdateIssue,
      isSuccess: false
    });

    setup();

    // open the edit modal
    const editButton = screen.getByTestId(
      'issues-page.issue-card0.issue-card-edit-button.button'
    );
    fireEvent.click(editButton);
    expect(
      screen.getByTestId(
        'issues-page.edit-modal.title-textfield.textfield-input'
      )
    ).toBeInTheDocument();

    // fill in the form fields
    const submitEditButton = screen.getByTestId(
      'issues-page.edit-modal.edit-button.button'
    );
    fireEvent.click(submitEditButton);

    expect(mockUpdateIssue).toHaveBeenCalled();
  });
});
