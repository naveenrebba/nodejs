const express = require('express');
const app = express();
const port = 9870;

//connect with pg
const Pool = require('pg').Pool;
const pool = new Pool(
    {
        user:'',
        host:'localhost',
        database:'postgres',
        port:5432
    }
)

app.get('/',(req,res) => {
    pool.query('SELECT * FROM customers',(err,result)=>{
        if(err) throw err;
        res.send(result.rows)
    })
})

app.post('/addUser',(req,res) => {
    var first_name = req.query.first_name;
    var last_name = req.query.last_name;
    var gender = req.query.gender;
    var phone = req.query.phone;
    var email = req.query.email;

    pool.query(`insert into customers (first_name, last_name, gender, phone, email) values (${first_name},${last_name},${gender},${phone},${email}`,(err,result)=>{
        if(err) throw err;
        res.send('Data Added')
    })
})


app.listen(port)