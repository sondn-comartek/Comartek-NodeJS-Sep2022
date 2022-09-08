var dgram = require(`dgram`);
var client = dgram.createSocket('udp4');


http=require(`http`).createServer().listen(12000,(res,req)=>{
    client.send('Hello World!',0, 12, 12000, '127.0.0.1');
client.send('Hello2World!',0, 12, 12000, '127.0.0.1');
client.send('Hello3World!',0, 12, 12000, '127.0.0.1', function(err, bytes) {
client.close();
})
req.end()
})