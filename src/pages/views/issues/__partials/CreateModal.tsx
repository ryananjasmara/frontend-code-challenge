import { Button, Datepicker, TextField } from '@/shared/components';
import React from 'react';
import './CreateModal.css';
import { CreateIssuePayload } from '@/services/types';
import { useCreateModalUtil } from '@/hooks/Issues/CreateModal.util';

export interface Props {
  testId?: string;
  isOpen: boolean;
  onClose: () => void;
  onCreate: (issue: CreateIssuePayload) => void;
}

const CreateModal: React.FC<Props> = (props) => {
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
    handleCreate,
    handleGenerateImage
  } = useCreateModalUtil(props);

  if (!props.isOpen) return null;

  return (
    <div className="create-modal-overlay">
      <div className="create-modal-container">
        <h2
          className="create-modal-header"
          data-testid={`${props.testId}.modal-title`}
        >
          Create New Issue
        </h2>
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
            className="create-modal-image"
          />
        )}
        <TextField
          testId={`${props.testId}.image-uri-textfield`}
          type="text"
          label="Image URI"
          value={imageUri}
          onChange={setImageUri}
        />
        <div className="create-modal-button-container">
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
            testId={`${props.testId}.create-button`}
            type="text"
            title="Create"
            onClick={handleCreate}
            backgroundColor="blue"
            isDisabled={!title || !issueNumber || !issueDate || !imageUri}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
