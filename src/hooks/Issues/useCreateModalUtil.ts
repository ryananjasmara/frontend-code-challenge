import { useState } from 'react';
import { Props } from '@/pages/views/issues/__partials/CreateModal';
import { generateRandomImage } from '@/shared/utils';

export const useCreateModalUtil = (props: Props) => {
  const [title, setTitle] = useState('');
  const [issueNumber, setIssueNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [imageUri, setImageUri] = useState('');

  const handleClose = () => {
    setTitle('');
    setIssueNumber('');
    setIssueDate('');
    setImageUri('');
    props.onClose();
  };

  const handleCreate = () => {
    props.onCreate({
      title,
      issueNumber: parseInt(issueNumber),
      issueDate,
      imageUri
    });

    handleClose();
  };

  const handleGenerateImage = () => {
    const randomImage = generateRandomImage();
    setImageUri(randomImage);
  };

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
    handleCreate,
    handleGenerateImage
  };
};
