export const transformTimeToMs = (timeString: string) => {
  const time = timeString.replace(/[a-z]/g, '0').split(':');

  return (parseInt(time[0]) * 60 * 60 + parseInt(time[1]) * 60 + parseInt(time[2])) * 1000;
};
