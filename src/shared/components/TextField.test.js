import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { TextField } from './TextField';

describe('TextField Component', () => {
  const setup = (
    value = '',
    label = 'Enter Text',
    type = 'text',
    onChange = jest.fn(),
    testId = 'test'
  ) => {
    render(
      <TextField
        value={value}
        label={label}
        type={type}
        onChange={onChange}
        testId={testId}
      />
    );
  };

  it('should render the label correctly', () => {
    setup();
    expect(screen.getByTestId('test.textfield-label')).toBeInTheDocument();
    expect(screen.getByText('Enter Text')).toBeInTheDocument();
  });

  it('should have the correct initial value', () => {
    setup('initial value');
    expect(screen.getByTestId('test.textfield-input')).toHaveValue(
      'initial value'
    );
  });

  it('should call onChange with the correct value when text is changed', () => {
    const handleChange = jest.fn();
    setup('', 'Enter Text', 'text', handleChange);

    fireEvent.change(screen.getByTestId('test.textfield-input'), {
      target: { value: 'new value' }
    });

    expect(handleChange).toHaveBeenCalledWith('new value');
  });

  it('should call onChange with the correct value when number is changed', () => {
    const handleChange = jest.fn();
    setup('', 'Enter Number', 'number', handleChange);

    fireEvent.change(screen.getByTestId('test.textfield-input'), {
      target: { value: '123' }
    });

    expect(handleChange).toHaveBeenCalledWith('123');
  });

  it('should prevent non-numeric input when type is number', () => {
    const handleChange = jest.fn();
    setup('', 'Enter Number', 'number', handleChange);

    fireEvent.change(screen.getByTestId('test.textfield-input'), {
      target: { value: 'abc' }
    });

    expect(handleChange).not.toHaveBeenCalled();
  });
});
