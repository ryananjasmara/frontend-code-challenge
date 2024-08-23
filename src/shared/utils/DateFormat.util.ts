// Will return a formatted date string in the format of "MMM DD, YY".
export const simpleDateFormat = (value: string) => {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  })
    .format(date)
    .replace(/,(\s\d+:)/, '$1');
};
