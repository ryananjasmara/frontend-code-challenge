import React from 'react';
import './Toast.css';

interface Props {
  message: string;
  type: 'success' | 'warning' | 'error' | null;
}

export const Toast: React.FC<Props> = (props) => {
  const getBackgroundColor = (type: 'success' | 'warning' | 'error' | null) => {
    switch (type) {
    case 'success':
      return 'toast-success';
    case 'warning':
      return 'toast-warning';
    case 'error':
      return 'toast-error';
    default:
      return 'toast-default';
    }
  };

  return (
    <div className={`toast-container ${getBackgroundColor(props.type)}`}>
      {props.message}
    </div>
  );
};
