const nodejsfresher = (req, res) => {
  let currentUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  res.status(200).send(`<h1>${currentUrl}</h1>`);
};
const about = (req, res) => {
  res.status(200).json({ message: "about" });
};
const nodejstest = (req, res) => {
  res.status(200).json({ message: "nodejstest" });
};
module.exports = { nodejsfresher, about, nodejstest };
