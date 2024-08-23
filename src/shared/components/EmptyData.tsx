import React from 'react';
import './EmptyData.css';

interface Props {
  testId?: string;
  title: string;
}

export const EmptyData: React.FC<Props> = (props) => (
  <div className="empty-data-container">
    <p
      className="empty-data-text"
      data-testid={`${props.testId}.empty-data-text`}
    >
      {props.title}
    </p>
  </div>
);
