import React from 'react';
import './TextField.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
  label: string;
  type: 'number' | 'text';
}

export const TextField: React.FC<Props> = (props) => {
  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.type === 'number') {
      const value = e.target.value;
      if (!/^\d*$/.test(value)) {
        e.preventDefault();
        return;
      }
    }
    props.onChange(e.target.value);
  };

  return (
    <div className="textfield-container">
      <label className="textfield-label">{props.label}</label>
      <input
        type="text"
        className="textfield-input"
        value={props.value}
        onChange={handleChanges}
      />
    </div>
  );
};
