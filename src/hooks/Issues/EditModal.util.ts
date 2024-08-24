import { useEffect, useState } from 'react';
import { Props } from '@/pages/views/issues/__partials/EditModal';
import { useGetIssueDetail } from '@/services/queries';
import { generateRandomImage } from '@/shared/utils';

export const useEditModalUtil = (props: Props) => {
  const [title, setTitle] = useState('');
  const [issueNumber, setIssueNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [imageUri, setImageUri] = useState('');

  const { data: issueDetailData, isLoading: isLoadingIssueDetail } =
    useGetIssueDetail({
      params: { id: props.issueId },
      enabled: props.isOpen && props.issueId !== ''
    });

  const handleClose = () => {
    setTitle('');
    setIssueNumber('');
    setIssueDate('');
    setImageUri('');
    props.onClose();
  };

  const handleEdit = () => {
    if (title && issueNumber && issueDate && imageUri) {
      props.onEdit({
        id: props.issueId,
        title,
        issueNumber: parseInt(issueNumber),
        issueDate,
        imageUri
      });

      handleClose();
    }
  };

  const handleGenerateImage = () => {
    const randomImage = generateRandomImage();
    setImageUri(randomImage);
  };

  useEffect(() => {
    if (!isLoadingIssueDetail && issueDetailData?.data) {
      setTitle(issueDetailData.data.title);
      setIssueNumber(issueDetailData.data.issueNumber.toString());
      setIssueDate(issueDetailData.data.issueDate);
      setImageUri(issueDetailData.data.imageUri);
    }
  }, [issueDetailData?.data, isLoadingIssueDetail]);

  return {
    title,
    setTitle,
    issueNumber,
    setIssueNumber,
    issueDate,
    setIssueDate,
    imageUri,
    setImageUri,
    handleClose,
    handleEdit,
    handleGenerateImage,
    issueDetailData,
    isLoadingIssueDetail
  };
};
