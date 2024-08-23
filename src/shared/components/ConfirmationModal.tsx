import React from 'react';
import './ConfirmationModal.css';
import { Button } from './Button';

interface Props {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  isOpen: boolean;
}

export const ConfirmationModal: React.FC<Props> = (props) => {
  if (!props.isOpen) return null;

  return (
    <div className="confirmation-modal-overlay">
      <div className="confirmation-modal-container">
        <h2 className="confirmation-modal-title">{props.title}</h2>
        <p className="confirmation-modal-description">{props.description}</p>
        <div className="confirmation-modal-actions">
          <Button type='text' title={props.cancelButtonLabel || 'Cancel'} onClick={props.onCancel} backgroundColor='neutral' />
          <Button type='text' title={props.confirmButtonLabel || 'Confirm'} onClick={props.onConfirm} backgroundColor='blue' />
        </div>
      </div>
    </div>
  );
};
