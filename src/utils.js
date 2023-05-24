export function formatDateTime(date, time) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString(undefined, options);
  const [hours, minutes] = time.split(':');
  const formattedTime = `${hours}:${minutes}`;

  return `${formattedDate} at ${formattedTime}`;
}
export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString(
    undefined,
    options
  );
  return formattedDate;
}
