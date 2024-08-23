import React from 'react';
import { Button, ConfirmationModal, EmptyData } from '@/shared/components';
import {
  MagnifyingGlassIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from '@heroicons/react/24/solid';
import IssueCard from './__partials/IssueCard';
import IssueCardSkeleton from './__partials/IssueCardSkeleton';
import FilterModal from './__partials/FilterModal';
import CreateModal from './__partials/CreateModal';
import EditModal from './__partials/EditModal';
import './Issues.css';
import useIssuePageUtil from './Issues.util';

const testId = 'issues-page';

const IssuesPage: React.FC = () => {
  const {
    keyword,
    setKeyword,
    currentPage,
    totalPages,
    isModalCreateOpen,
    isModalDeleteOpen,
    isModalEditOpen,
    isModalFilterOpen,
    sortBy,
    order,
    selectedIssueId,
    issueListData,
    isLoadingIssueList,
    handlePreviousPage,
    handleNextPage,
    handleOpenModalFilter,
    handleCloseModalFilter,
    handleApplyFilter,
    handleResetFilter,
    handleOpenModalCreate,
    handleCloseModalCreate,
    handleCreateNewIssue,
    handleOpenModalEdit,
    handleCloseModalEdit,
    handleSubmitEdit,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleConfirmDelete
  } = useIssuePageUtil();

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
            isLoadingIssueList ||
            (issueListData &&
              issueListData.data &&
              issueListData.data.length > 0)
              ? 'items-start'
              : 'items-center'
          }`}
        >
          {isLoadingIssueList ? (
            <div className="issues-page-content-loading">
              {Array.from({ length: 10 }).map((_, index) => (
                <IssueCardSkeleton key={index} />
              ))}
            </div>
          ) : issueListData?.data.length === 0 ? (
            <EmptyData
              title="No Issues found..."
              testId={`${testId}.empty-data`}
            />
          ) : (
            <div className="issues-page-content-data">
              {issueListData?.data.map((issue) => (
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
