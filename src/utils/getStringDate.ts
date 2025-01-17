function getStringDate(date: Date): string {
  if (date.toString() === "Invalid date") {
    return "Invalid date";
  }
  function addZero(arg: number): string {
    return arg < 10 ? "0" + arg : String(arg);
  }
  const months = date.getMonth() + 1;
  const days = date.getDate();
  const years = date.getFullYear();
  return `${addZero(months)}/${addZero(days)}/${years}`;
}
export default getStringDate;
