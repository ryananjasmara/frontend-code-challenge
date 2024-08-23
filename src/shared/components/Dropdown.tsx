import React from 'react';
import './Dropdown.css';

interface Items {
  id: number | string;
  name: string;
}

interface Props {
  testId?: string;
  value: string;
  onChange: (value: string) => void;
  items: Items[];
  defaultOption: string;
  label: string;
}

export const Dropdown: React.FC<Props> = (props) => {
  return (
    <div className="dropdown-container">
      <label
        className="dropdown-label"
        data-testid={`${props.testId}.dropdown-label`}
      >
        {props.label}
      </label>
      <select
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className="dropdown-select"
        data-testid={`${props.testId}.dropdown-select`}
      >
        <option
          value=""
          disabled
          data-testid={`${props.testId}.dropdown-select.default-option`}
        >
          {props.defaultOption}
        </option>
        {props.items.map((item, index) => (
          <option
            key={item.id}
            value={item.id}
            data-testid={`${props.testId}.dropdown-select.option${index}`}
          >
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};
