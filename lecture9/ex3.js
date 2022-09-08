const fs = require('fs')

let file = fs.readFileSync(__dirname + '/tmp.json')
file = JSON.parse(file.toString())
console.log(file)