var http=require('http');
var server=http.createServer(function(req,res){
    res.write(" created first node server")
})
server.listen(8632,function(err){
    if (err)throw err;
    console.log('sever is running')
})