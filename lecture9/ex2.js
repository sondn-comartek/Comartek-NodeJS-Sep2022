const http = require('http')

const app = http.createServer((req, res) => {
    if (req.url === '/nodetest') {
        res.write(`<h1>nodetest</h1>`)
    }
    else if (req.url === '/about') {
        res.write(`<h1>about</h1>`)
    }
    else if (req.url === '/') {
        res.write(`<h1>nodejsfresher</h1>`)
    }
    else {
        res.write(`<h1>404 Not found</h1>`)
    }
    res.end()
}).listen(3000, () => {
    console.log('listen at port 3000')
})

