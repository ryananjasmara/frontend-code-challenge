import React from 'react';
import './Dropdown.css';

interface Items {
  id: number | string;
  name: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  items: Items[];
  defaultOption: string;
  label: string;
}

export const Dropdown: React.FC<Props> = (props) => {
  return (
    <div className="dropdown-container">
      <label className="dropdown-label">{props.label}</label>
      <select
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className="dropdown-select"
      >
        <option value="" disabled>
          {props.defaultOption}
        </option>
        {props.items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};