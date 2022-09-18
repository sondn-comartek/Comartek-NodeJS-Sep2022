const fs = require("fs");
const inputFolderDir = "./input";
const outputFileDir = "./output.txt";
const inputFileType = "txt";

var content = "===OUTPUT===\n";

fs.readdir(inputFolderDir, (err, files) => {
  if (err) {
    throw err;
  }
  files.forEach((file) => {
    const fileName = file.toString();
    if (fileName.split(".")[1] !== inputFileType) {
      return;
    }
    const fileDir = inputFolderDir + "/" + fileName;
    const data = fs.readFileSync(fileDir);
    console.log({ fileName, data: data.toString() });
    content += `Name: ${fileName}\nContent: ${data.toString()}\n======\n`;
  });
  fs.writeFileSync(outputFileDir, content);
});
