import { useGetIssues } from '@/services/queries';
import React from 'react';

const IssuesList: React.FC = () => {
  const { data, isLoading, isError } = useGetIssues({ enabled: true, staleTime: 60 });

  console.log(data, isLoading, isError);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Issues List</h1>
      <ul className="space-y-4">
      </ul>
    </div>
  );
};

export default IssuesList;