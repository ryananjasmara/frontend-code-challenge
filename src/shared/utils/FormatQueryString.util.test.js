import { formatQueryString } from './FormatQueryString.util';

describe('formatQueryString', () => {
  it('should return an empty string for an empty object', () => {
    expect(formatQueryString({})).toBe('');
  });

  it('should return a query string for an object with non-empty values', () => {
    const params = { name: 'John', age: '30', city: 'New York' };
    const queryString = formatQueryString(params);
    expect(queryString).toBe('name=John&age=30&city=New+York');
  });

  it('should exclude keys with empty values from the query string', () => {
    const params = { name: 'John', age: '', city: 'New York' };
    const queryString = formatQueryString(params);
    expect(queryString).toBe('name=John&city=New+York');
  });

  it('should handle objects with numeric values correctly', () => {
    const params = { name: 'John', age: 30, city: 'New York' };
    const queryString = formatQueryString(params);
    expect(queryString).toBe('name=John&age=30&city=New+York');
  });

  it('should handle objects with boolean values correctly', () => {
    const params = { name: 'John', active: true, city: 'New York' };
    const queryString = formatQueryString(params);
    expect(queryString).toBe('name=John&active=true&city=New+York');
  });

  it('should handle objects with null and undefined values correctly', () => {
    const params = { name: 'John', age: null, city: undefined };
    const queryString = formatQueryString(params);
    expect(queryString).toBe('name=John');
  });
});
