import express from 'express';
import request from 'request';
const port = process.env.PORT || 7800;
const app = express();

app.use(express.static(__dirname + '/public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/weather/:city',(req,res) => {
    let apiUrl = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${req.params.city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
    request(apiUrl, (err, apiResponse) => {
        if(err) throw err;
        //res.send(apiResponse.body)
        let output = JSON.parse(apiResponse.body)
        res.render('index',{title:'Weather App', result:output})
    })
})


app.listen(port,(err) => {
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})