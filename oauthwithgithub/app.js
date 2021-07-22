const express = require('express');
const app = express();
const superagent = require('superagent');
const request = require('request');
const port = 7800;
const cors = require('cors');

app.use(cors());

app.get('/',(req,res) => {
    res.send(`<a href="https://github.com/login/oauth/authorize?client_id=9a550c0563a5b760d938">Login With Github</a>`)
})

app.get('/user', (req,res) => {
    const code = req.query.code;
    if(!code){
        res.send({
            success:false,
            message:' Error on Code'
        })
    }
    superagent
        .post('https://github.com/login/oauth/access_token')
        .send({
            client_id:'9a550c0563a5b760d938',
            client_secret:'28c5d878a92a26559da08f5dc5cf4b473c282980',
            code: code
        })
        .set('Accept', 'application/json')
        .end((err,result) => {
            if(err) throw err;
            var acctoken = result.body.access_token;
            const option = {
                url:'https://api.github.com/user',
                method: 'GET',
                headers:{
                    'Accept': 'application/json',
                    'Authorization':'token '+acctoken,
                    'User-Agent':'mycode'
                }
            }
            request(option, (err,response,body) => {
                res.send(body)
            })
        })
})

app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})