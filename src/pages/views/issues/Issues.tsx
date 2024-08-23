import { useState, useEffect } from 'react';
import {
  useCreateIssue,
  useDeleteIssue,
  useGetIssues,
  useUpdateIssue
} from '@/services/queries';
import { Button, ConfirmationModal, EmptyData } from '@/shared/components';
import {
  MagnifyingGlassIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from '@heroicons/react/24/solid';
import { useDebounce } from '@/shared/utils';
import IssueCard from './__partials/IssueCard';
import IssueCardSkeleton from './__partials/IssueCardSkeleton';
import FilterModal, { IFilterData } from './__partials/FilterModal';
import CreateModal from './__partials/CreateModal';
import { CreateIssuePayload, UpdateIssuePayload } from '@/services/types';
import EditModal from './__partials/EditModal';
import './Issues.css';

const testId = 'issues-page';

const IssuesPage: React.FC = () => {
  // keyword
  const [keyword, setKeyword] = useState('');
  const debounceKeyword = useDebounce(keyword, 1000);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // modal create
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  // modal delete
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  // modal edit
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  // modal filter
  const [isModalFilterOpen, setIsModalFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('');
  // shared
  const [selectedIssueId, setSelectedIssueId] = useState('');

  const { data, isLoading } = useGetIssues({
    enabled: true,
    staleTime: 60,
    params: {
      page: currentPage,
      limit: 10,
      keyword: debounceKeyword,
      sortBy: sortBy,
      order: order
    }
  });

  const deleteIssueMutation = useDeleteIssue();
  const createIssueMutation = useCreateIssue();
  const updateIssueMutation = useUpdateIssue();

  useEffect(() => {
    if (data) {
      setTotalPages(data.meta.totalPage);
    }
  }, [data]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleOpenModalFilter = () => {
    setIsModalFilterOpen(true);
  };

  const handleCloseModalFilter = () => {
    setIsModalFilterOpen(false);
  };

  const handleApplyFilter = (filters: IFilterData) => {
    setSortBy(filters.sortBy);
    setOrder(filters.order);
    handleCloseModalFilter();
  };

  const handleResetFilter = () => {
    setSortBy('');
    setOrder('');
  };

  const handleOpenModalCreate = () => {
    setIsModalCreateOpen(true);
  };

  const handleCloseModalCreate = () => {
    setIsModalCreateOpen(false);
  };

  const handleCreateNewIssue = (payload: CreateIssuePayload) => {
    createIssueMutation.mutate(payload);
    handleCloseModalCreate();
  };

  const handleOpenModalEdit = (issueId: string) => {
    setIsModalEditOpen(true);
    setSelectedIssueId(issueId);
  };

  const handleCloseModalEdit = () => {
    setIsModalEditOpen(false);
    setSelectedIssueId('');
  };

  const handleSubmitEdit = (payload: UpdateIssuePayload) => {
    updateIssueMutation.mutate(payload);
  };

  const handleOpenModalDelete = (issueId: string) => {
    setIsModalDeleteOpen(true);
    setSelectedIssueId(issueId);
  };

  const handleCloseModalDelete = () => {
    setIsModalDeleteOpen(false);
    setSelectedIssueId('');
  };

  const handleConfirmDelete = () => {
    deleteIssueMutation.mutate({ id: selectedIssueId });
  };

  useEffect(() => {
    if (deleteIssueMutation.isSuccess) {
      setCurrentPage(1);
      deleteIssueMutation.reset();
      handleCloseModalDelete();
    }
  }, [deleteIssueMutation.isSuccess]);

  useEffect(() => {
    if (updateIssueMutation.isSuccess) {
      setCurrentPage(1);
      updateIssueMutation.reset();
      handleCloseModalEdit();
    }
  }, [updateIssueMutation.isSuccess]);

  return (
    <div className="issues-page-container">
      <div className="issues-page-inner-container">
        <div className="issues-page-header">
          <h1
            className="issues-page-title"
            data-testid={`${testId}.page-title`}
          >
            Past Issues
          </h1>
          <div className="issues-page-button-container">
            <Button
              testId={`${testId}.create-issue-button`}
              title="Create New Issue"
              backgroundColor="blue"
              type="text"
              onClick={handleOpenModalCreate}
            />
          </div>
          <div className="issues-page-search-filter-container">
            <div className="issues-page-search-container">
              <input
                data-testid={`${testId}.search-input`}
                type="text"
                className="issues-page-search-input"
                placeholder="Search issue..."
                value={keyword}
                onChange={(newVal) => setKeyword(newVal.target.value)}
              />
              <MagnifyingGlassIcon className="issues-page-search-icon" />
            </div>
            <Button
              data-testid={`${testId}.filter-button`}
              title="Filter"
              backgroundColor="blue"
              type="text"
              onClick={handleOpenModalFilter}
            />
          </div>
        </div>
        <div
          className={`issues-page-content-container ${
            isLoading || (data && data.data && data.data.length > 0)
              ? 'items-start'
              : 'items-center'
          }`}
        >
          {isLoading ? (
            <div className="issues-page-content-loading">
              {Array.from({ length: 10 }).map((_, index) => (
                <IssueCardSkeleton key={index} />
              ))}
            </div>
          ) : data?.data.length === 0 ? (
            <EmptyData
              title="No Issues found..."
              testId={`${testId}.empty-data`}
            />
          ) : (
            <div className="issues-page-content-data">
              {data?.data.map((issue) => (
                <IssueCard
                  key={issue._id.toString()}
                  issueNumber={issue.issueNumber}
                  title={issue.title}
                  issueDate={issue.issueDate}
                  imageUri={issue.imageUri}
                  onEdit={() => handleOpenModalEdit(issue._id.toString())}
                  onRemove={() => handleOpenModalDelete(issue._id.toString())}
                />
              ))}
            </div>
          )}
        </div>
        <div className="issues-page-pagination-container">
          <div className="issues-page-pagination-controls">
            <Button
              icon={<ArrowLeftIcon className="h-5 w-5" />}
              backgroundColor="blue"
              type="icon"
              onClick={handlePreviousPage}
              isDisabled={currentPage === 1}
            />
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <Button
              icon={<ArrowRightIcon className="h-5 w-5" />}
              backgroundColor="blue"
              type="icon"
              onClick={handleNextPage}
              isDisabled={currentPage === totalPages}
            />
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalDeleteOpen}
        onCancel={handleCloseModalDelete}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        description={`Are you sure you want to delete this issue?`}
      />
      <FilterModal
        isOpen={isModalFilterOpen}
        onClose={handleCloseModalFilter}
        onConfirm={handleApplyFilter}
        onReset={handleResetFilter}
        filterSortBy={sortBy}
        filterOrder={order}
      />
      <CreateModal
        isOpen={isModalCreateOpen}
        onClose={handleCloseModalCreate}
        onCreate={handleCreateNewIssue}
      />
      <EditModal
        isOpen={isModalEditOpen}
        issueId={selectedIssueId}
        onClose={handleCloseModalEdit}
        onEdit={handleSubmitEdit}
      />
    </div>
  );
};

export default IssuesPage;
