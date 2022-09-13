const fs = require('fs')


const readFiles = (files) => {
    let ans = files.map((file) => {
        let data = fs.readFileSync(__dirname + `/input/${file}`, 'utf8')
        return {
            Name: file,
            Content: data
        }
    })
    let res = `=============== OUTPUT ================\n`
    ans.forEach((el) => {
        res = res + 'Name: ' + el.Name + '\n'
        res = res + 'Content: ' + el.Content + '\n'
        res += '\n'
        res = res + '=======================================\n'

    })
    return res
}
fs.writeFileSync(__dirname + `/output/output.txt`, readFiles(['file1.txt', 'file2.txt']))
