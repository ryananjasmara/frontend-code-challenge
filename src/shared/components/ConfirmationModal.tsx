import React from 'react';
import './ConfirmationModal.css';
import { Button } from './Button';

interface ConfirmationModalProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  isOpen: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = (props) => {
  if (!props.isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">{props.title}</h2>
        <p className="modal-description">{props.description}</p>
        <div className="modal-actions">
          <Button type='text' title={props.cancelButtonLabel || 'Cancel'} onClick={props.onCancel} backgroundColor='neutral' />
          <Button type='text' title={props.confirmButtonLabel || 'Confirm'} onClick={props.onConfirm} backgroundColor='blue' />
        </div>
      </div>
    </div>
  );
};
