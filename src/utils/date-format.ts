const DATE_FORMAT = new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "2-digit", year: "numeric" });
const DATE_TIME_FORMAT = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

export const dateFormat = (date : any) => {
  return DATE_FORMAT.format(new Date(date));
};

export const dateTimeFormat = (timestamp: any) => {
  return DATE_TIME_FORMAT.format(new Date(timestamp));
};

export const dateTimeDiffinDays = (startDateTime : any, endDateTime : any) => {
  if (!startDateTime || !endDateTime) return 0;
  const start = new Date(startDateTime);
  const end = new Date(endDateTime);
  const timeDiff = end.getTime() - start.getTime();
  return Math.round(timeDiff / (1000 * 3600 * 24));
};
