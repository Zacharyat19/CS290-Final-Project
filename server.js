var fs = require("fs")
var http = require("http")
var path = require("path")
var multer = require("multer")
var crypto = require("crypto")
var express = require('express')
var app = express()
const uploadImg = multer({dest: '/images/'})
const formidable = require('formidable');

var numPotatos = 4;

// Recourses for uploading images: https://www.npmjs.com/package/react-images-uploading https://web.engr.oregonstate.edu/~hessro/teaching/cs493-sp21#Storing-File-Data 

var express = require('express')
var app = express()

var port = 420

var images
var messages

app.use(express.static('public'))

fs.readFile('./images.json', 'utf8', (err, data) => {

    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {

        // parse JSON string to JSON object
        images = JSON.parse(data);
    }

});

fs.readFile('./messages.json', 'utf8', (err, data) => {

    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {

        // parse JSON string to JSON object
        messages = JSON.parse(data);
    }

});

app.get('/', function(req,res,next){
    console.log("GET /")
    console.log("req.url", req.url)
    console.log("req.method", req.method)
    console.log("req.headers", req.headers)

    res.status(200).sendFile(__dirname + '/public/index.html')
})

app.get('/new-potato', function(req,res,next){
    console.log("GET /new-potato")
    console.log("req.url", req.url)
    console.log("req.method", req.method)
    console.log("req.headers", req.headers)

    res.status(200).sendFile(__dirname + '/public/newPotato.html')
})

app.post('/images', (req, res, next) => { //Image uploading
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        console.log("files.image.path",files.image.path) //.image is a property sent by the form
        console.log("files.image.name", files.image.name)
        var oldPath = files.image.path;
        var newPath = path.join(__dirname, 'images') + '/' + files.image.name;
        var rawData = fs.readFileSync(oldPath);
      
        fs.writeFile(newPath, rawData, function(err){
            if(err) console.log(err)
            return res.send("Successfully uploaded")
        })
  })
});
    
app.get('/:particularPotato', function(req,res,next){
    if(req.url == "/potato"){
    console.log("GET /" + req.params.particularPotato)
    console.log("req.url", req.url)
    console.log("req.method", req.method)
    console.log("req.headers", req.headers)

    var num = Math.round(Math.random() * (numPotatos - 1))
    num += 1
    console.log("Returning :" + req.params.particularPotato + num + '.png')
    res.status(200).sendFile(__dirname + '/images/' + req.params.particularPotato + num + '.png')
    }
    else{
        res.status(200).sendFile(__dirname + req.url)
    }
})

app.get('*', function(req,res,next){   //Throw 404 if page not found
    console.log("404 Error. Page not found")
    console.log("req.url", req.url)
    console.log("req.method", req.method)
    console.log("req.headers", req.headers)

    res.status(404).sendFile(__dirname + '/public/404.html')
})

app.listen(port, function(){
    console.log("Server is listening on port", port)
})