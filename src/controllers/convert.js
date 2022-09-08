const converter = (req, res) => {
  res.render("converter");
};
const processConvert = (req, res) => {
  const { data } = req.body;
  const temp = 2.20462262;
  let lb = temp * data;
  lb = lb.toFixed(2);
  res.json({ result: lb });
};
module.exports = { converter, processConvert };
