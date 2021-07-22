var express=require('express')
var hotelRouter=express.Router();
var mongodb=require('mongodb').MongoClient;
var url="mongodb://127.0.0.1:27017";
//var url="mongodb+srv://rebbanaveen666:<password>@cluster0.mo3bm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
hotelRouter.route('/')
 .get(function(req,res){
	 mongodb.connect(url,function(err,connection){
		 if(err){
			 res.status(501).send("error while connecting")
		 }else{
			 const dbo=connection.db('nodejs')
			 dbo.collection('hotels').find({}).toArray(function(err,data){
				 if(err){
					 res.status(501).send("errror whilew fetchinf")
				 }else{
					 res.render('hotel',{title:'hotelpage',hotelData:data})
				 }
			 })
		 }
	 })
 })
 hotelRouter.route('/details/:id')
 .get(function(req,res){
	 var id=req.params.id;
	 mongodb.connect(url,function(err,connection){
		 if (err){
			 res.status(501).send("error while connecting")
		 }else{
			 const dbo=connection.db('nodejs')
			 dbo.collection('hotels').find({id:id},function(err,data){
				 if (err){
					 res.status(501).send("error while fletching")

				 }else{
					 res.render('hotelDetails',{title:data.name,details:data})
				 }
			 })
		 }
	 })
 })
	 

 module.exports=hotelRouter