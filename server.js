var fs = require("fs")
var http = require("http")
var path = require("path")
var multer = require("multer")
const uploadImg = multer({dest: '/images/'})

var express = require('express')
var app = express()

var port = 420


app.get('/', function(req,res,next){
    console.log("GET /")
    console.log("req.url", req.url)
    console.log("req.method", req.method)
    console.log("req.headers", req.headers)

    res.status(200).sendFile(__dirname + '/index.html')
})

app.get('/new-potato', function(req,res,next){
    console.log("GET /new-potato")
    console.log("req.url", req.url)
    console.log("req.method", req.method)
    console.log("req.headers", req.headers)

    res.status(200).sendFile(__dirname + '/newPotato.html')
})

app.post("/new-potato", uploadImg.single("newPotato") ,function(req, res, next) { //WORK IN PROGRESS
    
    var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        res.write('File uploaded');
        res.end();
      })
})
    
app.get('/:particularPotato', function(req,res,next){
    console.log("GET /" + req.params.particularPotato)
    console.log("req.url", req.url)
    console.log("req.method", req.method)
    console.log("req.headers", req.headers)

    res.status(200).sendFile(__dirname + '/images/' + req.params.particularPotato)
})

app.get('*', function(req,res,next){   //Throw 404 if page not found
    console.log("404 Error. Page not found")
    console.log("req.url", req.url)
    console.log("req.method", req.method)
    console.log("req.headers", req.headers)

    res.status(404).sendFile(__dirname + '/404.html')
})

app.listen(port, function(){
    console.log("Server is listening on port", port)
})