const fs = require("fs");

const pathInputFile =["./input/file1.txt", "./input/file2.txt"];
const pathOutputFile = "./output/output.txt";

const readAndWrite = () => {
    var allContent = "=============== OUTPUT ================\n";
    for (let path of pathInputFile) {
        const data = fs.readFileSync(path, 'utf-8');
        allContent += "Name: " + path.split('/')[2] + "\n";
        allContent += "Content: " + data;
        allContent += "\n\n";
        allContent += "=======================================\n";
    }
    allContent += "..."
    fs.writeFileSync(pathOutputFile, allContent);
}

readAndWrite();