import { useState, useEffect } from 'react';
import { useGetIssues } from '@/services/queries';
import { CardSkeleton, Card, Button } from '@/components';

const IssuesList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { data, isLoading } = useGetIssues({ 
    enabled: true, 
    staleTime: 60, 
    params: {
      page: currentPage,
      limit: 10,
    } 
  });

  useEffect(() => {
    if (data) {
      setTotalPages(data.meta.totalPage);
    }
  }, [data]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleEditIssue = (id: string) => {};

  const handleDeleteIssue = (id: string) => {};

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-2">Past Issues</h1>
          <div className="flex justify-between space-x-3">
            <Button title='Create New Issue' backgroundColor='blue' type='text' onClick={() => {}} />
            <Button title='Filter' backgroundColor='blue' type='text' onClick={() => {}} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, index) => <CardSkeleton key={index} />)
          ) : (
            data?.data.map((issue) => (
              <Card
                key={issue._id.toString()}
                issueNumber={issue.issueNumber}
                title={issue.title}
                issueDate={issue.issueDate}
                imageUri={issue.imageUri}
                onEdit={() => handleEditIssue(issue._id.toString())}
                onRemove={() => handleDeleteIssue(issue._id.toString())}
              />
            ))
          )}
        </div>
        <div className="flex justify-between items-center mt-4">
          <Button 
            title='Previous' 
            backgroundColor='blue' 
            type='text' 
            onClick={handlePreviousPage} 
            isDisabled={currentPage === 1}
          />
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <Button 
            title='Next' 
            backgroundColor='blue' 
            type='text' 
            onClick={handleNextPage} 
            isDisabled={currentPage === totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default IssuesList;