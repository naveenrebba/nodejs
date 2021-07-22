var express = require('express');
var axios = require('axios');
var redis = require('redis');
var port = 9600;
var app = express();

const client = redis.createClient({
    host: 'localhost',
    port: 6379
})

app.get('/data', function (req, res){
    const userInput = (req.query.country).trim()
    const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`;
    // check in redis
    return client.get(`${userInput}`,function (err,result){
        // if data is in redis
        if(result){
            const output = JSON.parse(result);
            res.send(output)              
        }else {
            // as data is not in redis
            axios.get(url)
            .then(response => {
                // api response
                const output = response.data
                // save data in redis for next time
                client.setex(`${userInput}`,3600,JSON.stringify({source:'Redis Cache',output}))
                // return api response
                res.status(200).send({source:'Api',output})
            }) 
        }
    })
    
})

app.listen(port, (err) => {
    console.log(`Server is running on port ${port}`)
})