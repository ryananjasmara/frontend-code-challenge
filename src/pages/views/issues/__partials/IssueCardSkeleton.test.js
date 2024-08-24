import React from 'react';
import { render, screen } from '@testing-library/react';
import IssueCardSkeleton from './IssueCardSkeleton';

describe('IssueCardSkeleton Component', () => {
  const setup = () => {
    return render(<IssueCardSkeleton />);
  };

  it('should render the skeleton badge', () => {
    setup();
    expect(
      document.querySelector('.issue-card-skeleton-badge')
    ).toBeInTheDocument();
  });

  it('should render the image placeholder', () => {
    setup();
    expect(
      document.querySelector('.issue-card-skeleton-image-placeholder')
    ).toBeInTheDocument();
  });

  it('should render the content placeholders', () => {
    setup();
    expect(
      document.querySelector('.issue-card-skeleton-content')
    ).toBeInTheDocument();
    expect(
      document.querySelector('.issue-card-skeleton-text-placeholder')
    ).toBeInTheDocument();
  });

  it('should render the icon placeholders', () => {
    setup();
    expect(
      document.querySelector('.issue-card-skeleton-icon-group')
    ).toBeInTheDocument();
    expect(
      document.querySelector('.issue-card-skeleton-icon-placeholder')
    ).toBeInTheDocument();
  });
});
