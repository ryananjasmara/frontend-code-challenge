import { Button, Datepicker, TextField } from '@/shared/components';
import React, { Fragment, useEffect, useState } from 'react';
import './EditModal.css';
import { UpdateIssuePayload } from '@/services/types';
import { useIssuesContext } from '@/pages/contexts/Issues.context';
import { useGetIssueDetail } from '@/services/queries';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (issue: UpdateIssuePayload) => void;
}

const EditModal: React.FC<Props> = (props) => {
  const {
    stateContext: { modalEditData }
  } = useIssuesContext();

  const { data, isLoading } = useGetIssueDetail({
    params: { id: modalEditData.issueId },
    enabled: modalEditData.issueId !== ''
  });

  const [title, setTitle] = useState('');
  const [issueNumber, setIssueNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [imageUri, setImageUri] = useState('');

  useEffect(() => {
    if (!isLoading && data?.data) {
      setTitle(data.data.title);
      setIssueNumber(data.data.issueNumber.toString());
      setIssueDate(data.data.issueDate);
      setImageUri(data.data.imageUri);
    }
  }, [data?.data, isLoading]);

  const handleEdit = () => {
    if (title && issueNumber && issueDate && imageUri) {
      props.onEdit({
        id: modalEditData.issueId,
        title,
        issueNumber: parseInt(issueNumber),
        issueDate,
        imageUri
      });

      handleClose();
    }
  };

  const handleGenerateImage = () => {
    const background = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    const foreground = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    const generatedImageUri = `https://dummyimage.com/300x300/${background}/${foreground}`;

    setImageUri(generatedImageUri);
  };

  const handleClose = () => {
    setTitle('');
    setIssueNumber('');
    setIssueDate('');
    setImageUri('');
    props.onClose();
  };

  const Skeleton = () => {
    return (
      <div>
        <div className="edit-modal-skeleton-header" />
        <div className="edit-modal-skeleton-textfield" />
        <div className="edit-modal-skeleton-textfield" />
        <div className="edit-modal-skeleton-textfield" />
        <div className="edit-modal-skeleton-image" />
        <div className="edit-modal-skeleton-textfield" />
      </div>
    );
  };

  if (!props.isOpen) return null;

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-container">
        {isLoading ? (
          <Skeleton />
        ) : (
          <Fragment>
            <h2 className="edit-modal-header">{`Edit ${data?.data.title}`}</h2>
            <TextField
              type="text"
              label="Title"
              value={title}
              onChange={setTitle}
            />
            <TextField
              type="number"
              label="Issue Number"
              value={issueNumber}
              onChange={setIssueNumber}
            />
            <Datepicker
              label="Issue Date"
              value={issueDate}
              onChange={setIssueDate}
            />
            {imageUri && (
              <img
                src={imageUri}
                alt="Issue Image"
                className="edit-modal-image"
              />
            )}
            <TextField
              type="text"
              label="Image URI"
              value={imageUri}
              onChange={setImageUri}
            />
          </Fragment>
        )}
        <div className="edit-modal-button-container">
          <Button
            type="text"
            title="Generate Image"
            onClick={handleGenerateImage}
            backgroundColor="yellow"
          />
          <Button
            type="text"
            title="Close"
            onClick={handleClose}
            backgroundColor="neutral"
          />
          <Button
            type="text"
            title="Edit"
            onClick={handleEdit}
            backgroundColor="blue"
            isDisabled={!title || !issueNumber || !issueDate || !imageUri}
          />
        </div>
      </div>
    </div>
  );
};

export default EditModal;
