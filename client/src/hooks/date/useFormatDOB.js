import { useMemo } from "react";

const useFormatDOB = (timestamp) => {
  const formattedDate = useMemo(() => {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "";

    const day = date.getUTCDate().toString().padStart(2, "0");
    const year = date.getUTCFullYear();

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = months[date.getUTCMonth()];

    return `${day}-${monthName}-${year}`;
  }, [timestamp]);

  return formattedDate;
};

export default useFormatDOB;
