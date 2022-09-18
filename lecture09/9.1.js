const oneDayMilisecond = 1000 * 60 * 60 * 24;

function getSecondInYear() {
  const current = new Date();
  const currentYear = current.getFullYear();
  const january = "0";
  const december = "11";
  const initDate = new Date(currentYear, january, 0);
  const endDate = new Date(currentYear, december, 31);
  return Math.round(endDate - initDate) / 1000;
}

function getSecondInCentury() {
  return 100 * getSecondInCentury();
}

function timeTillChristmas() {
  const current = new Date();
  const currentYear = current.getFullYear();
  const christmas = "Dec 25, " + currentYear;
  const christmasDate = new Date(christmas);

  return Math.round(christmasDate - current) / 1000;
}

function dayTillChristmas() {
  const secondTillChristmas = timeTillChristmas();
  return secondTillChristmas / 86400;
}

console.log({
  secondInYear: getSecondInYear(),
  // secondInCentury: getSecondInCentury(),
  timeTillChristmas: timeTillChristmas(),
  dayTillChristmas: dayTillChristmas(),
});
