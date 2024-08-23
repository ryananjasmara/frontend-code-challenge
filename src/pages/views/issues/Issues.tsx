import { useState, useEffect } from 'react';
import {
  useCreateIssue,
  useDeleteIssue,
  useGetIssues,
  useUpdateIssue
} from '@/services/queries';
import { Button, ConfirmationModal, EmptyData } from '@/shared/components';
import { useIssuesContext } from '@/pages/contexts/Issues.context';
import { IIssue } from '@/models/Issues';
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

const IssuesPage: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const debounceKeyword = useDebounce(keyword, 1000);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const {
    stateContext: {
      modalDeleteData,
      modalFilterData,
      modalCreateData,
      modalEditData
    },
    eventContext: {
      setModalDeleteData,
      setModalFilterData,
      setModalCreateData,
      setModalEditData,
      handleResetModalDeleteData,
      handleResetModalCreateData,
      handleResetModalEditData
    }
  } = useIssuesContext();

  const { data, isLoading } = useGetIssues({
    enabled: true,
    staleTime: 60,
    params: {
      page: currentPage,
      limit: 10,
      keyword: debounceKeyword,
      sortBy: modalFilterData.filterData.sortBy,
      order: modalFilterData.filterData.order
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
    setModalFilterData({
      ...modalFilterData,
      isOpen: true
    });
  };

  const handleApplyFilter = (filters: IFilterData) => {
    setModalFilterData({
      isOpen: false,
      filterData: filters
    });
  };

  const handleOpenModalCreate = () => {
    setModalCreateData({
      isOpen: true
    });
  };

  const handleCreateNewIssue = (payload: CreateIssuePayload) => {
    createIssueMutation.mutate(payload);
    handleResetModalCreateData();
  };

  const handleOpenModalEdit = (issueId: string) => {
    setModalEditData({
      isOpen: true,
      issueId
    });
  };

  const handleSubmitEdit = (payload: UpdateIssuePayload) => {
    updateIssueMutation.mutate(payload);
    handleResetModalEditData();
  };

  const handleOpenModalDelete = (issue: IIssue) => {
    setModalDeleteData({
      isOpen: true,
      issue
    });
  };

  const handleConfirmDelete = () => {
    if (modalDeleteData.issue) {
      deleteIssueMutation.mutate({ id: modalDeleteData.issue?._id.toString() });
      handleResetModalDeleteData();
    }
  };

  return (
    <div className="issues-page-container">
      <div className="issues-page-inner-container">
        <div className="issues-page-header">
          <h1 className="issues-page-title">Past Issues</h1>
          <div className="issues-page-button-container">
            <Button
              title="Create New Issue"
              backgroundColor="blue"
              type="text"
              onClick={handleOpenModalCreate}
            />
          </div>
          <div className="issues-page-search-filter-container">
            <div className="issues-page-search-container">
              <input
                type="text"
                className="issues-page-search-input"
                placeholder="Search issue..."
                value={keyword}
                onChange={(newVal) => setKeyword(newVal.target.value)}
              />
              <MagnifyingGlassIcon className="issues-page-search-icon" />
            </div>
            <Button
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
            <EmptyData title="No Issues found..." />
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
                  onRemove={() => handleOpenModalDelete(issue)}
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
        {...modalDeleteData}
        onCancel={handleResetModalDeleteData}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        description={`Are you sure you want to delete ${modalDeleteData.issue?.title}?`}
      />
      <FilterModal
        {...modalFilterData}
        onClose={() =>
          setModalFilterData({ ...modalFilterData, isOpen: false })
        }
        onConfirm={handleApplyFilter}
      />
      <CreateModal
        {...modalCreateData}
        onClose={handleResetModalCreateData}
        onCreate={handleCreateNewIssue}
      />
      <EditModal
        {...modalEditData}
        onClose={handleResetModalEditData}
        onEdit={handleSubmitEdit}
      />
    </div>
  );
};

export default IssuesPage;
