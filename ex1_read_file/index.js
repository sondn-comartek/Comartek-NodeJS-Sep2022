const fs = require("fs");

const path = require("path");

const pathInput = path.join(__dirname, "input");
const pathOutput = path.join(__dirname, "output/output.txt");

fs.readdir(pathInput, (err, files) => {
  let content = "=============== OUTPUT ================\n";
  files.forEach((file) => {
    const data = fs.readFileSync(pathInput + "/" + file, {
      encoding: "utf8",
      flag: "r",
    });

    content += `Name: ${file}\nContent: ${data}\n=======================================\n`;
  });

  fs.writeFileSync(pathOutput, content);
});
