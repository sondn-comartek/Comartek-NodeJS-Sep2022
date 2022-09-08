const fs = require('fs')

let file = fs.readFileSync(__dirname + '/tmp.json', (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }
})
file = JSON.parse(file.toString())
console.log(file)