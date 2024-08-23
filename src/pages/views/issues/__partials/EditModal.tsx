import { Button, Datepicker, TextField } from '@/shared/components';
import React, { Fragment } from 'react';
import './EditModal.css';
import { UpdateIssuePayload } from '@/services/types';
import { useEditModalUtil } from './EditModal.util';

export interface Props {
  testId?: string;
  isOpen: boolean;
  issueId: string;
  onClose: () => void;
  onEdit: (issue: UpdateIssuePayload) => void;
}

const EditModal: React.FC<Props> = (props) => {
  const {
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
  } = useEditModalUtil(props);

  if (!props.isOpen) return null;

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

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-container">
        {isLoadingIssueDetail ? (
          <Skeleton />
        ) : (
          <Fragment>
            <h2 className="edit-modal-header">{`Edit ${issueDetailData?.data.title}`}</h2>
            <TextField
              testId={`${props.testId}.title-textfield`}
              type="text"
              label="Title"
              value={title}
              onChange={setTitle}
            />
            <TextField
              testId={`${props.testId}.issue-number-textfield`}
              type="number"
              label="Issue Number"
              value={issueNumber}
              onChange={setIssueNumber}
            />
            <Datepicker
              testId={`${props.testId}.issue-date-datepicker`}
              label="Issue Date"
              value={issueDate}
              onChange={setIssueDate}
            />
            {imageUri && (
              <img
                data-testid={`${props.testId}.image-preview`}
                src={imageUri}
                alt="Issue Image"
                className="edit-modal-image"
              />
            )}
            <TextField
              testId={`${props.testId}.image-uri-textfield`}
              type="text"
              label="Image URI"
              value={imageUri}
              onChange={setImageUri}
            />
          </Fragment>
        )}
        <div className="edit-modal-button-container">
          <Button
            testId={`${props.testId}.generate-image-button`}
            type="text"
            title="Generate Image"
            onClick={handleGenerateImage}
            backgroundColor="yellow"
          />
          <Button
            testId={`${props.testId}.close-button`}
            type="text"
            title="Close"
            onClick={handleClose}
            backgroundColor="neutral"
          />
          <Button
            testId={`${props.testId}.edit-button`}
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
