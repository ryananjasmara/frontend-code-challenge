import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Datepicker } from './Datepicker';

describe('Datepicker Component', () => {
  const setup = (
    value = '',
    label = 'Select Date',
    onChange = jest.fn(),
    testId = 'test'
  ) => {
    render(
      <Datepicker
        value={value}
        label={label}
        onChange={onChange}
        testId={testId}
      />
    );
  };

  it('should render the label correctly', () => {
    setup('', 'Select Date');

    expect(screen.getByTestId('test.datepicker-label')).toHaveTextContent(
      'Select Date'
    );
  });

  it('should have the correct initial value', () => {
    setup('2023-01-01', 'Select Date');

    expect(screen.getByTestId('test.datepicker-input')).toHaveValue(
      '2023-01-01'
    );
  });

  it('should call onChange with the correct value when date is changed', () => {
    const handleChange = jest.fn();
    setup('', 'Select Date', handleChange);

    fireEvent.change(screen.getByTestId('test.datepicker-input'), {
      target: { value: '2023-01-01' }
    });

    expect(handleChange).toHaveBeenCalledWith('2023-01-01');
  });

  it('should call onChange with an empty string when date is cleared', () => {
    const handleChange = jest.fn();
    setup('2023-01-01', 'Select Date', handleChange);

    fireEvent.change(screen.getByTestId('test.datepicker-input'), {
      target: { value: '' }
    });

    expect(handleChange).toHaveBeenCalledWith('');
  });
});
