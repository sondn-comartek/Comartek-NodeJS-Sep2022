const counter = (req, res) => {
  const { day, seconds } = infoCounter();
  res.render("christmas", { day: day, seconds: seconds });
};
const infoCounter = () => {
  const christmasDay = "12/25/" + new Date().getFullYear();
  const todayTime = new Date().getTime();
  const christmasTime = new Date(christmasDay).getTime();
  let timeRemaining = christmasTime - todayTime;
  let secondsRemaining = convertToSeconds(timeRemaining);
  let dayRemaining = convertToDay(timeRemaining);
  return { day: dayRemaining, seconds: secondsRemaining };
};
const counterAPI = (req, res) => {
  const { day, seconds } = infoCounter();
  res.status(200).json({ data: { day: day, seconds: seconds } });
};
const convertToDay = (time) => {
  return Math.floor(time * 1.15740741 * Math.pow(10, -8));
};
const convertToSeconds = (time) => {
  return Math.floor(time * 0.001);
};
module.exports = { counter, counterAPI };
