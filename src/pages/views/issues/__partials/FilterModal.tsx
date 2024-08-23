import { useState, useEffect, use } from 'react';
import { Dropdown, Button } from '@/shared/components';
import './FilterModal.css';
import { useFilterModalUtil } from './FilterModal.util';

export interface IFilterData {
  sortBy: string;
  order: string;
}
export interface Props {
  testId?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (filters: IFilterData) => void;
  onReset: () => void;
  filterSortBy: string;
  filterOrder: string;
}

const FilterModal: React.FC<Props> = (props) => {
  const { sortBy, setSortBy, order, setOrder, handleResetFilter } =
    useFilterModalUtil(props);

  if (!props.isOpen) return null;

  return (
    <div className="filter-modal-container">
      <div className="filter-modal-content">
        <div className="filter-modal-overlay" aria-hidden="true">
          <div className="filter-modal-overlay-bg"></div>
        </div>
        <span className="filter-modal-hidden-span" aria-hidden="true">
          &#8203;
        </span>
        <div className="filter-modal-dialog">
          <div className="filter-modal-body">
            <div className="filter-modal-header">
              <div className="filter-modal-title">
                <h3>Filter Issues</h3>
                <Dropdown
                  testId={`${props.testId}.sort-by-dropdown`}
                  label="Sort By"
                  value={sortBy}
                  onChange={(val) => setSortBy(val)}
                  items={[
                    { id: 'issueNumber', name: 'Issue Number' },
                    { id: 'title', name: 'Title' },
                    { id: 'date', name: 'Date' }
                  ]}
                  defaultOption="Select Sort Criteria"
                />
                <Dropdown
                  testId={`${props.testId}.order-dropdown`}
                  label="Order"
                  value={order}
                  onChange={(val) => setOrder(val)}
                  items={[
                    { id: 'ascending', name: 'Ascending' },
                    { id: 'descending', name: 'Descending' }
                  ]}
                  defaultOption="Select Order Criteria"
                />
              </div>
            </div>
          </div>
          <div className="filter-modal-footer">
            <Button
              testId={`${props.testId}.apply-button`}
              type="text"
              title="Apply"
              onClick={() => props.onConfirm({ sortBy, order })}
              backgroundColor="blue"
            />
            <div className="filter-modal-footer-buttons">
              <Button
                testId={`${props.testId}.close-button`}
                type="text"
                title="Close"
                onClick={props.onClose}
                backgroundColor="neutral"
              />
              <Button
                testId={`${props.testId}.reset-button`}
                type="text"
                title="Reset"
                onClick={handleResetFilter}
                backgroundColor="yellow"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
