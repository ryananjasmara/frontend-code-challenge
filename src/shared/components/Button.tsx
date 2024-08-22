import React from 'react';
import './Button.css';

interface TextButtonProps {
  type: 'text';
  title: string;
  backgroundColor: 'blue' | 'red' | 'green' | 'yellow' | 'neutral';
  icon?: never;
  onClick: () => void;
  isDisabled?: boolean;
}

interface IconButtonProps {
  type: 'icon';
  title?: never;
  backgroundColor: 'blue' | 'red' | 'green' | 'yellow' | 'neutral';
  icon: React.ReactNode;
  onClick: () => void;
  isDisabled?: boolean;
}

type ButtonProps = TextButtonProps | IconButtonProps;

export const Button: React.FC<ButtonProps> = (props) => {
  let colorClass = props.backgroundColor;
  if (props.isDisabled) {
    colorClass += ' disabled';
  }

  return (
    <div>
      <button
        onClick={props.isDisabled ? undefined : props.onClick}
        className={`button-container ${colorClass}`}
        disabled={props.isDisabled}
      >
        {props.type === 'icon' && props.icon
          ? React.isValidElement(props.icon)
            ? React.cloneElement(props.icon as React.ReactElement)
            : null
          : props.title}
      </button>
    </div>
  );
};
