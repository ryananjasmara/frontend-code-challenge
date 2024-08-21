// Will return a formatted date string in the format of "DD MMM, YY".
export const simpleDateFormat = (value: string) => {
    if (!value) {
        return null;
    }

    const date = new Date(value);

    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    }).format(date).replace(/,(\s\d+:)/, "$1");
};