const Mailjet = require ('node-mailjet')
mailjet =new Mailjet({apiKey:process.env.apiKey,apiSecret:process.env.apiSecret})
function sendLink(link,mail){

const request = mailjet
.post("send", {'version': 'v3.1'})
.request({
  "Messages":[
    {
      "From": {
        "Email": "minhtuan25902@gmail.com",
        "Name": "tuan"
      },
      "To": [
        {
          "Email": mail,
          "Name": "tuan"
        }
      ],
      "Subject": "Click link to Change Password You've forgot",
      "TextPart": link,
    }
  ]
})
request
  .then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    console.log(err.statusCode)
  })
}
module.exports=sendLink