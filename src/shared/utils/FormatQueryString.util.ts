// Will return a query string from an object with non-empty values
export const formatQueryString = <T extends Record<string, any>>(params: T) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== '' && value !== null && value !== undefined
    )
  );
  const queryString = new URLSearchParams(filteredParams as any).toString();

  return queryString;
};
