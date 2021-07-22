 var fs=require('fs');
/*fs.writeFile('myapp.xt','this is node appp',function(err){
    if (err) throw err;
    console.log("file created")

})
 
fs.writeFile('mytext.txt','this node fs',function(err){
if(err) throw err;
    
    console.log('file crated')
})


fs.appendFile('mycode.txt',"this is line\n",function(err){
    if (err) throw err;
    console.log('content added')
})
*/
fs.readFile('myapp.xt','utf-8',function(err,datadat){
    if (err) throw err;
    console.log(datadat)
})

/*
fs.rename("mycode.txt","first.txt",function(){
    console.log('file renamed')
})*/
