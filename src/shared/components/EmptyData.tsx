import React from 'react';
import './EmptyData.css';

interface Props {
  title: string;
}

export const EmptyData: React.FC<Props> = (props) => (
  <div className="empty-data-container">
    <p className="empty-data-text">{props.title}</p>
  </div>
);
