import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

export const secondsToLongDate = (seconds: number) =>
  dayjs(seconds * 1000).format('MMMM D, YYYY');

export const secondsToLongDateTime = (seconds: number) =>
  dayjs(seconds * 1000).format('MMMM D, YYYY h:mm A');

dayjs.extend(relativeTime);
dayjs.extend(utc);

export const secondsToShortRelativeTime = (seconds: number) => {
  return dayjs.utc(seconds * 1000).fromNow();
};

export const secondsToRelativeTime = (seconds: number) => {
  const ms = seconds * 1000;
  const now = dayjs();

  const pastTime = dayjs(ms);

  return pastTime.from(now);
};
