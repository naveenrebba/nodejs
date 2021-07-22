var express = require('express');
var app = express(); 
dotenv=require('dotenv');
dotenv.config();
var port=process.env.PORT||5600;
var menu=[
    {link:'/',name:'Home'},
    {link:'/hotel',name:'Hotel'},
    {linka:'/city',name:'City'}
] 
var fs=require('fs')
var cityRouter = require('./src/router/cityRoutes')
var hotelRouter = require('./src/router/hotelRoutes')
var morgan=require('morgan');
app.use(morgan('dev'))
app.use(morgan('dev',{stream:fs.createWriteStream('./app.log',{flags:'a'})}))

app.use(express.static(__dirname+'/public'))
app.set('views','./src/views');
app.set('view engine','ejs')



app.get('/',function(req,res){
    // res.send("Hii From express");
    res.render('home',{title:'homepage',keyword:'node fullstack',menu:menu})
})

app.use('/hotel',hotelRouter);
app.use('/city', cityRouter);


app.listen(port, function(err){
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})