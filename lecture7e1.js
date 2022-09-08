const fs = require('fs')


const CoppyFileContent = async () => {
  const files = fs.readdirSync('input');
  let allContent = ""

  for (let i = 0; i < files.length; i++) {
    const stat = fs.statSync(__dirname + '/input/' + files[i]);
    if (stat.isFile()) {
      const data = fs.readFileSync(__dirname + '/input/' + files[i],
                                  { encoding: 'utf8', flag: 'r' });
      allContent += data + '\n'
    }
  }
  fs.writeFileSync(__dirname + '/output/output.txt', allContent);
  console.log("Copying success")
}
CoppyFileContent()