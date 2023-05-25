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

export function formatDateYMD(date) {
  const currentDate = new Date(date);
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export function convertTo12HourFormat(time24) {
  // Split the time into hours and minutes
  let [hours, minutes] = time24.split(':');

  // Convert hours to a number
  let hoursNum = parseInt(hours, 10);

  // Determine if it's AM or PM based on hours
  let period;
  if (hoursNum === 0) {
    period = 'AM';
    hoursNum = 12;
  } else if (hoursNum >= 12) {
    period = 'PM';
    hoursNum -= 12;
  } else {
    period = 'AM';
  }

  // Convert hours to 12-hour format
  let hours12 = hoursNum;

  // Create the formatted time string
  let time12 = `${hours12}:${minutes} ${period}`;

  return time12;
}
