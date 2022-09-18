function getCurrentDate() {
  return new Date();
}

function getCurrentTime() {
  return Date.now();
}

module.exports = { getCurrentDate, getCurrentTime };
