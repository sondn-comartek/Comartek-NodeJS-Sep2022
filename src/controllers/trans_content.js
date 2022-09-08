const { readdir, readFile, writeFile } = require("fs").promises;
const path = require("path");
const readFiles = async (path) => {
  try {
    const files = await readdir(path);
    let content = [];
    for (const file of files) {
      const data = await readFile(`${path}/${file}`, "utf-8");
      content.push({ file: file, content: data });
    }
    return content;
  } catch (error) {
    throw Error(error);
  }
};
const writeFiles = async (outputFile) => {
  let inputFolder = path.resolve("./public/input/");
  let contents = await readFiles(inputFolder);
  let readyContent = ``;
  for (const { file, content } of contents) {
    readyContent += `name: ${file} \n content: ${content}\n======\n`;
  }
  try {
    await writeFile(outputFile, readyContent, "utf-8");
    return "success";
  } catch (error) {
    return "write file fail";
  }
};

function main() {
  const outputPath = path.resolve("./public/output/output.txt");
  writeFiles(outputPath)
    .then((result) => console.log(result))
    .catch((err) => {
      console.log(err);
    });
}
main();
