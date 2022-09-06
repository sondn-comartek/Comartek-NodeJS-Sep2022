const express = require('express')
const app = express()
const port = process.env.port || 3000

app.post('/register', (req, res) => {
  
})

app.post('/login', (req, res) => {

})

app.post('/password/reset', (req, res) => {

})

app.put('/password/reset/:token', (req, res) => {

})


app.listen(port, () => {
  console.log(`Server runing on ${port}`)
})