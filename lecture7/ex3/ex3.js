const fs = require('fs')

function convertToLB(input) {
    let data = input.split(' ')
    if (data[1] === 'kg') {
        return data[0] / 0.45359237
    }
    if (data[1] === 'oz') {
        return data[0] / 16
    }
    if (data[1] === 'g') {
        return data[0] / 453.59237
    }
}

let data = fs.readFileSync(__dirname + `/input.txt`, 'utf8')
data = data.split('\r\n')
let ans = '=========== WEIGHT CONVERT TO LB ==========\n'
data.forEach((el) => {
    ans += 'Input: ' + el + '\n'
    ans += 'Output: ' + convertToLB(el).toFixed(2) + ' lb\n'
    ans += '--------------------------------------\n'
})
console.log(ans)