import { useState, useEffect } from 'react';
import { Props } from './FilterModal';

const useFilterModalUtil = (props: Props) => {
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('');

  const handleResetFilter = () => {
    setSortBy('');
    setOrder('');
  };

  useEffect(() => {
    if (props.isOpen) {
      setSortBy(props.filterSortBy);
      setOrder(props.filterOrder);
    }
  }, [props.isOpen, props.filterSortBy, props.filterOrder]);

  return {
    sortBy,
    setSortBy,
    order,
    setOrder,
    handleResetFilter
  };
};

export default useFilterModalUtil;
