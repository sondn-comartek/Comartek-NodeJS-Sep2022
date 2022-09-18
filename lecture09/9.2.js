const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const PORT = 5000;

app.get("/:inputString", (req, res) => {
  const demoInputString = ["nodetest", "about"];
  const inputString = req.params.inputString;

  if (!demoInputString.includes(inputString)) {
    return res.redirect("/");
  }

  const response = `<h1>${inputString}</h1>`;
  return res.status(200).send(response);
});

app.use((req, res) => {
  return res.status(404).send("Page not found");
});

async function main() {
  server.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Server running on port ${PORT}`);
  });
}

main().catch((error) => {
  throw error;
});
