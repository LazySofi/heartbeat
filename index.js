const express = require('express')
const app = express()
const port = 3000

var users = [],
        t = [];

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
})

app.get('/index.html', (request, response) => {
    if(users.indexOf(request.ip)==-1)
    {
        users.push(request.ip);
        t.push(10);
        console.log(request.ip + ' is now alive!');
    }

    for(var i=0;i<t.length;i++)t[i]=10;

    response.sendFile(__dirname + '/index.html');
})

var timerId = setInterval(function(){
    for(var i=0;i<t.length;i++)
    {
        t[i]--;
        if(t[i]<=0)
        {
            console.log(users[i] + ' is now dead!');
            t.splice(i,1);
            users.splice(i,1);   
        }
    }
 }, 1000);

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})