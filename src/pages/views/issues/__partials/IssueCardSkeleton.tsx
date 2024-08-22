import React from 'react';
import './IssueCardSkeleton.css';

export const IssueCardSkeleton: React.FC = () => {
  return (
    <div className="card-skeleton">
      <div className="badge"></div>
      <div className="image-placeholder"></div>
      <div className="content">
        <div>
          <div className="text-placeholder"></div>
          <div className="text-placeholder"></div>
        </div>
        <div className="icon-group">
          <div className="icon-placeholder"></div>
          <div className="icon-placeholder"></div>
        </div>
      </div>
    </div>
  );
};