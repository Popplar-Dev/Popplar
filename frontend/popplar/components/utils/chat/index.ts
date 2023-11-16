export const getDateAndTime = (chattingCreatedAt: string) => {

  const createdDate = new Date(chattingCreatedAt)
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    dayPeriod: 'long',
    hour: '2-digit',
    minute: '2-digit',
  };

  const formattedDate = createdDate.toLocaleDateString(
    'ko-KR',
    dateOptions,
  );
  const formattedTime = createdDate.toLocaleTimeString(
    'ko-KR',
    timeOptions,
  );

  return [formattedDate, formattedTime];
};
