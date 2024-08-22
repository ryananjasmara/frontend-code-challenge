import React from 'react';
import Issues from './views/issues/Issues';

const DefaultPage: React.FC = () => {
  return (
    <div className="default-page-container">
      <Issues />
    </div>
  );
};

export default DefaultPage;
