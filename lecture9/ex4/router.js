const http = require('http')
function router(url) {
    http.createServer((req, res) => {
        if (req.url === url) {
            res.write(`<h1>${__dirname + '/tmp.json'} </h1>`)
        }
        else {
            res.write(`<h1>404 Not found</h1>`)
        }
        res.end()
    }).listen(3000)
}

module.exports = router
