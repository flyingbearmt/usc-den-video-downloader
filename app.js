var express = require('express');
var app = express();
// var converter = require("node-m3u8-to-mp4");
var m3u8ToMp4 = require("./m3u8tomp4.js");
var converter = new m3u8ToMp4();


//  Cross-siteHTTPrequest
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST,GET");
    res.header("X-Powered-By", '3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//  http://localhost:8081/download_usc_den_video?url=Losangeles
app.get('/download_cspiration_video', function(req, res) {
    const q = req.query;
    console.log(q);
    
    console.log(" i received the download URL:" + `/${q.downloadurl}`);
    console.log(" i received the filename:" + `/${q.filename}`);
    var filename = `/${q.filename}`;
    var myRe = /http:\/\/.*playlist\.m3u8/g;
    var myArray = myRe.exec(`/${q.downloadurl}`);
    var outRe= /([A-Z]+[0-9]+_)[0-9]{8}([0-9]+)/g;
    var out = outRe.exec(`/${q.downloadurl}`);
    // var outName = ${q.filename};
    var outName = out[1]+ out[2];
    console.log("input filename is:"+ myArray[0]);
    console.log("outname is:"+ outName);
    converter
        .setInputFile(myArray[0])
        .setOutputFile("./LectureVideo/"+outName+".mp4")
        .start()
        .then(() => {
            console.log("File converted");
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(defaultResult));
        });
})

module.exports = app;

const PORT = process.env.PORT || 8081
app.listen(PORT, function() {
    console.log("App started on port 8081");
});