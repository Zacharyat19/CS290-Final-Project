var fs = require("fs")
var http = require("http")
var path = require("path")
var multer = require("multer")
var crypto = require("crypto")
var express = require('express')
var app = express()
const uploadImg = multer({dest: '/images/'})
const formidable = require('formidable');

// Recourses for uploading images: https://www.npmjs.com/package/react-images-uploading https://web.engr.oregonstate.edu/~hessro/teaching/cs493-sp21#Storing-File-Data 

var express = require('express')
var app = express()

var port = 420

var images = require("./images.json")
var messages = require("./messages.json")

app.get('/', function(req,res,next){
    console.log("GET /")
    console.log("req.url", req.url)
    console.log("req.method", req.method)
    console.log("req.headers", req.headers)

    res.status(200).sendFile(__dirname + '/public/index.html')
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

        var size = 0;
        images.forEach(db=> {
            size++;
        });
        var num = Math.round(Math.random() * (size - 1))
        num += 1
        var i = 1
        var filename
        var bool = true
        images.forEach(db=> {
            if(i == num && bool){
                filename = db.title;
                bool = false;
            }
            else if(bool){
                i++
            }
        });
        console.log("Returning :" + filename)
        res.status(200).sendFile(__dirname + '/images/' + filename)
    }

    else{
        res.status(200).sendFile(__dirname + "/public/" + req.url)
    }
})

app.use(express.static('public'))

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