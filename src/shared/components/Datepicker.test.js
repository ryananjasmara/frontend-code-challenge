import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Datepicker } from './Datepicker';

describe('Datepicker Component', () => {
  const setup = (value = '', label = 'Select Date', onChange = jest.fn()) => {
    render(
      <Datepicker
        value={value}
        label={label}
        onChange={onChange}
        testId="testing"
      />
    );
  };

  it('should render the component correctly', () => {
    render(
      <Datepicker
        value={''}
        label={'Select Date'}
        onChange={jest.fn()}
        testId="testing"
      />
    );
    expect(screen.getByTestId('testing.datepicker-input')).toBeInTheDocument();
  });

  it('should render the label correctly', () => {
    render(
      <Datepicker
        value={''}
        label={'Select Date'}
        onChange={jest.fn()}
        testId="testing"
      />
    );
    expect(screen.getByTestId('testing.datepicker-label')).toHaveTextContent(
      'Select Date'
    );
  });

  it('should have the correct initial value', () => {
    render(
      <Datepicker
        value={'2023-01-01'}
        label={'Select Date'}
        onChange={jest.fn()}
        testId="testing"
      />
    );
    expect(screen.getByTestId('testing.datepicker-input')).toHaveValue(
      '2023-01-01'
    );
  });

  it('should call onChange with the correct value when date is changed', () => {
    const handleChange = jest.fn();
    render(
      <Datepicker
        value={''}
        label={'Select Date'}
        onChange={handleChange}
        testId="testing"
      />
    );

    fireEvent.change(screen.getByTestId('testing.datepicker-input'), {
      target: { value: '2023-01-01' }
    });

    expect(handleChange).toHaveBeenCalledWith('2023-01-01');
  });

  it('should call onChange with an empty string when date is cleared', () => {
    const handleChange = jest.fn();
    render(
      <Datepicker
        value={'2023-01-01'}
        label={'Select Date'}
        onChange={handleChange}
        testId="testing"
      />
    );

    fireEvent.change(screen.getByTestId('testing.datepicker-input'), {
      target: { value: '' }
    });

    expect(handleChange).toHaveBeenCalledWith('');
  });
});
