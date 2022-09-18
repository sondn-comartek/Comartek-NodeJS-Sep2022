async function addDays(date, days) {
  const dateObj = new Date(date);
  dateObj.setDate(dateObj.getDate() + days);
  return dateObj;
}

module.exports = { addDays };
