import { Button, Datepicker, TextField } from '@/shared/components';
import React, { useState } from 'react';
import './CreateModal.css';
import { CreateIssuePayload } from '@/services/types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (issue: CreateIssuePayload) => void;
}

const CreateModal: React.FC<Props> = (props) => {
  const [title, setTitle] = useState('');
  const [issueNumber, setIssueNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [imageUri, setImageUri] = useState('');

  const handleCreate = () => {
    if (title && issueNumber && issueDate && imageUri) {
      props.onCreate({
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

  if (!props.isOpen) return null;

  return (
    <div className="create-modal-overlay">
      <div className="create-modal-container">
        <h2 className="create-modal-header">Create New Issue</h2>
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
            className="create-modal-image"
          />
        )}
        <TextField
          type="text"
          label="Image URI"
          value={imageUri}
          onChange={setImageUri}
        />
        <div className="create-modal-button-container">
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
