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
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-4 flex-grow flex flex-col">
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-2">Past Issues</h1>
          <div className="mb-2">
            <Button
              title="Create New Issue"
              backgroundColor="blue"
              type="text"
              onClick={handleOpenModalCreate}
            />
          </div>
          <div className="flex justify-between space-x-3">
            <div className="relative">
              <input
                type="text"
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none
                  focus:ring-2 focus:ring-blue-500"
                placeholder="Search issue..."
                value={keyword}
                onChange={(newVal) => setKeyword(newVal.target.value)}
              />
              <MagnifyingGlassIcon
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 
                  text-gray-400"
              />
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
          className={`flex-grow flex justify-center ${
            isLoading || (data && data.data && data.data.length > 0)
              ? 'items-start'
              : 'items-center'
          }`}
        >
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
              {Array.from({ length: 10 }).map((_, index) => (
                <IssueCardSkeleton key={index} />
              ))}
            </div>
          ) : data?.data.length === 0 ? (
            <EmptyData title="No Issues found..." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
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
        <div className="flex flex-col">
          <div className="flex justify-center items-center mt-5 p-3 space-x-4">
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
