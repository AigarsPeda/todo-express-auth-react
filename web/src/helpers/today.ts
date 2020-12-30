export const today = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const d = new Date();
  const day = days[d.getDay()];
  const date = d.getDate();

  return `${day} ${date}`;
};
