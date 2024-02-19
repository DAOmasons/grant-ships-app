import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export const secondsToLongDate = (seconds: number) =>
  dayjs(seconds * 1000).format('MMMM D, YYYY');

export const secondsToLongDateTime = (seconds: number) =>
  dayjs(seconds * 1000).format('MMMM D, YYYY h:mm A');

dayjs.extend(relativeTime);

function abbreviateTimeAgo(timeAgo: string) {
  const parts = timeAgo.split(' ');
  if (parts.length === 2) {
    const number = parts[0];
    const unit = parts[1];

    let abbreviation;
    if (unit.startsWith('day')) abbreviation = 'd';
    else if (unit.startsWith('hour')) abbreviation = 'h';
    else if (unit.startsWith('minute')) abbreviation = 'm';
    else if (unit.startsWith('second')) abbreviation = 's';
    else if (unit.startsWith('month')) abbreviation = 'mo';
    else if (unit.startsWith('year')) abbreviation = 'y';

    return `${number}${abbreviation}`;
  } else if (parts.length === 1 && parts[0] === 'a') {
    const unit = parts[1];
    const abbreviation = unit.charAt(0);
    return `1${abbreviation}`;
  }
  return timeAgo;
}

export const secondsToShortRelativeTime = (seconds: number) => {
  const ms = seconds * 1000;
  const now = dayjs();

  const pastTime = dayjs(ms);

  const timeAgo = pastTime.from(now, true);

  return abbreviateTimeAgo(timeAgo);
};
