import React from 'react';
import { Dropdown, Button } from '@/shared/components';
import './FilterModal.css';

export interface IFilterData {
  sortBy: string;
  order: string;
}
interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (filters: IFilterData) => void;
}

const FilterModal: React.FC<FilterModalProps> = (props) => {
  const [sortBy, setSortBy] = React.useState('');
  const [order, setOrder] = React.useState('');

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
              type="text"
              title="Apply"
              onClick={() => props.onConfirm({ sortBy, order })}
              backgroundColor="blue"
            />
            <div className="filter-modal-footer-buttons">
              <Button
                type="text"
                title="Close"
                onClick={props.onClose}
                backgroundColor="neutral"
              />
              <Button
                type="text"
                title="Reset"
                onClick={() => {
                  setSortBy('');
                  setOrder('');
                }}
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
