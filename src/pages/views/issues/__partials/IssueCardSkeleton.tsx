import React from 'react';
import './IssueCardSkeleton.css';

const IssueCardSkeleton: React.FC = () => {
  return (
    <div className="issue-card-skeleton">
      <div className="issue-card-skeleton-badge"></div>
      <div className="issue-card-skeleton-image-placeholder"></div>
      <div className="issue-card-skeleton-content">
        <div>
          <div className="issue-card-skeleton-text-placeholder"></div>
          <div className="issue-card-skeleton-text-placeholder"></div>
        </div>
        <div className="issue-card-skeleton-icon-group">
          <div className="issue-card-skeleton-icon-placeholder"></div>
          <div className="issue-card-skeleton-icon-placeholder"></div>
        </div>
      </div>
    </div>
  );
};

export default IssueCardSkeleton;
