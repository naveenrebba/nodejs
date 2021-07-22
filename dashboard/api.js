const express = require('express');
const app = express();
const port = process.env.PORT || 9100;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoUrl = "mongodb://localhost:27017";
let db;
let col_name = "dashboard";
const swaggerUi = require('swagger-ui-express');
const package = require('./package.json');
const swaggerDocument = require('./swagger.json');

swaggerDocument.info.version = package.version;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// use middleware as bodyparser for post the data
app.use(bodyParser.urlencoded({extend:true}));
app.use(bodyParser.json());
// using fro cross origin resource sharing
app.use(cors())

app.get('/health', (req,res) => {
    res.status(200).send('Health Ok')
})

// Read
app.get('/users', (req,res) => {
    var query = {}
    if(req.query.role && req.query.city){
        query ={role:req.query.role, city:req.query.city, isActive:true}
    }else if( req.query.city){
        query ={city:req.query.city, isActive:true}
    }else{
        query = {isActive: true}
    }
    db.collection(col_name).find(query).toArray((err,result) => {
        if(err) throw err;
        res.status(200).send(result)
    })
})

// userDetails
app.get('/user/:id', (req,res) => {
    var id = mongo.ObjectID(req.params.id);
    db.collection(col_name).find({_id:id}).toArray((err,result) => {
        res.status(200).send(result)
    })
})
// insert
app.post('/addUser', (req,res) => {
    console.log(req.body)
    db.collection(col_name).insert(req.body,(err,result) => {
        if(err) throw err;
        res.send('Data Added')
    })
})

// update user
app.put('/updateUser',(req,res) => {
    db.collection(col_name).updateOne(
        {_id:mongo.ObjectID(req.body._id)},
        {
            $set:{
                name: req.body.name,
                city: req.body.city,
                phone: req.body.phone,
                role: req.body.role,
                isActive: true
            }
        },(err,result) => {
            if(err) throw err;
            res.send('Data Updated')
        }
    )
});

//deleteUser
app.delete('/deleteUser', (req,res) => {
    db.collection(col_name).remove({_id:mongo.ObjectID(req.body._id)}, (err,result) => {
        if(err) throw err;
        res.send('Data Deleted')
    })
})

// deactivate user
app.put('/deactivateUser',(req,res) => {
    db.collection(col_name).updateOne(
        {_id:mongo.ObjectID(req.body._id)},
        {
            $set:{
                isActive: false
            }
        },(err,result) => {
            if(err) throw err;
            res.send('User Deactivated')
        }
    )
});

// Activate user
app.put('/activateUser',(req,res) => {
    db.collection(col_name).updateOne(
        {_id:mongo.ObjectID(req.body._id)},
        {
            $set:{
                isActive: true
            }
        },(err,result) => {
            if(err) throw err;
            res.send('User Activated')
        }
    )
});

//db Connection
MongoClient.connect(mongoUrl, (err,client) => {
    if(err) console.log('Error while connecting');
    db = client.db('nodejs');
    app.listen(port, (err) => {
        console.log(`Server is running on port ${port}`)
    })
})