import React from 'react';

interface TextButtonProps {
    type: 'text';
    title: string;
    backgroundColor: 'blue' | 'red' | 'green' | 'yellow';
    icon?: never;
    onClick: () => void;
    isDisabled?: boolean;
}

interface IconButtonProps {
    type: 'icon';
    title?: never;
    backgroundColor: 'blue' | 'red' | 'green' | 'yellow';
    icon: React.ReactNode;
    onClick: () => void;
    isDisabled?: boolean;
}

type ButtonProps = TextButtonProps | IconButtonProps;

export const Button: React.FC<ButtonProps> = (props) => {
    let colorClass;
    switch (props.backgroundColor) {
        case 'blue':
            colorClass = 'bg-blue-500';
            break;
        case 'red':
            colorClass = 'bg-red-500';
            break;
        case 'green':
            colorClass = 'bg-green-500';
            break;
        case 'yellow':
            colorClass = 'bg-yellow-500';
            break;
    }

    if (props.isDisabled) {
        colorClass = 'bg-gray-500';
    }

    return (
        <div>
            <button onClick={props.isDisabled ? undefined : props.onClick} className={`text-white px-4 py-2 rounded hover:opacity-75 active:bg-gray-500 transition duration-200 ${colorClass}`}>
                {props.type === 'icon' && props.icon ? (
                    React.isValidElement(props.icon) ? (
                        React.cloneElement(props.icon as React.ReactElement)
                    ) : null
                ) : (
                    props.title
                )}
            </button>
        </div>
    );
};