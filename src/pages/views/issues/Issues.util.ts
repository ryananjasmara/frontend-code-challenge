import { useEffect, useState } from 'react';
import { generateRandomImage, useDebounce } from '@/shared/utils';
import {
  useCreateIssue,
  useDeleteIssue,
  useGetIssues,
  useUpdateIssue
} from '@/services/queries';
import { CreateIssuePayload, UpdateIssuePayload } from '@/services/types';
import { IFilterData } from './__partials/FilterModal';

const useIssuePageUtil = () => {
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

  const { data: issueListData, isLoading: isLoadingIssueList } = useGetIssues({
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
    if (issueListData) {
      setTotalPages(issueListData.meta.totalPage);
    }
  }, [issueListData]);

  useEffect(() => {
    if (deleteIssueMutation.isSuccess) {
      deleteIssueMutation.reset();
      handleCloseModalDelete();
    }
  }, [deleteIssueMutation.isSuccess]);

  useEffect(() => {
    if (updateIssueMutation.isSuccess) {
      updateIssueMutation.reset();
      handleCloseModalEdit();
    }
  }, [updateIssueMutation.isSuccess]);

  useEffect(() => {
    if (createIssueMutation.isSuccess) {
      createIssueMutation.reset();
      handleCloseModalDelete();
    }
  }, [createIssueMutation.isSuccess]);

  return {
    keyword,
    setKeyword,
    debounceKeyword,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    isModalCreateOpen,
    setIsModalCreateOpen,
    isModalDeleteOpen,
    setIsModalDeleteOpen,
    isModalEditOpen,
    setIsModalEditOpen,
    isModalFilterOpen,
    setIsModalFilterOpen,
    sortBy,
    setSortBy,
    order,
    setOrder,
    selectedIssueId,
    setSelectedIssueId,
    issueListData,
    isLoadingIssueList,
    deleteIssueMutation,
    createIssueMutation,
    updateIssueMutation,
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
  };
};

export default useIssuePageUtil;
