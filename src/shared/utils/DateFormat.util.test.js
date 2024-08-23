import { simpleDateFormat } from './DateFormat.util';

describe('simpleDateFormat', () => {
  it('should return null for an empty value', () => {
    expect(simpleDateFormat('')).toBeNull();
  });

  it('should return formatted date string for a valid date string', () => {
    const dateStr = '2023-10-05T00:00:00Z';
    const formattedDate = simpleDateFormat(dateStr);
    expect(formattedDate).toBe('Oct 05, 2023');
  });

  it('should return formatted date string for a valid date string without time', () => {
    const dateStr = '2023-10-05';
    const formattedDate = simpleDateFormat(dateStr);
    expect(formattedDate).toBe('Oct 05, 2023');
  });

  it('should handle invalid date strings gracefully', () => {
    const dateStr = 'invalid-date';
    const formattedDate = simpleDateFormat(dateStr);
    expect(formattedDate).toBe('Invalid Date');
  });
});
