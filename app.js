var express = require('express');
var app = express();
// var converter = require("node-m3u8-to-mp4");
var m3u8ToMp4 = require("./m3u8tomp4.js");
var converter = new m3u8ToMp4();
var defaultResult = { "key": "download is done" };

//  Cross-siteHTTPrequest
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST,GET");
    res.header("X-Powered-By", '3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//  http://localhost:8081/download_usc_den_video?url=Losangeles
app.get('/download_usc_den_video', function (req, res) {
    const q = req.query;
    // console.log(q);
    console.log("Received the download URL:" + `/${q.downloadurl}`);
    // console.log("Received the filename:" + `/${q.filename}`);
    var filename = `/${q.filename}`;
    //http://denawswz.uscden.net/aws/_definst_/mp4:amazons3/gwz/CSCI402_202018620200224/CSCI402_202018620200224.mp4/playlist.m3u8
    //http://denawswz.uscden.net/aws/_definst_/mp4:amazons3/gwz/CSCI402_20200323_120200323/CSCI402_20200323_120200323.mp4/playlist.m3u8?wowzaplaystart=0
    var myRe = /http:\/\/.*playlist\.m3u8/g;
    var myArray = myRe.exec(`/${q.downloadurl}`);
    // denawswz.uscden.net/aws/_definst_/mp4:amazons3/gwz/CSCI402_202018620200224/CSCI402_202018620200224.mp4/playlist.m3u8
    var outRe = /([A-Z]+[0-9]+_)[0-9]{7,8}(20[0-9]{6})/g;
    var out = outRe.exec(`/${q.downloadurl}`);
    if (out != null) {
        // console.log(out);
        // var outName = ${q.filename};
        var outName = out[1] + out[2];
    }
    else {
        //denawswz.uscden.net/aws/_definst_/mp4:amazons3/gwz/CSCI402_20200323_120200323/CSCI402_20200323_120200323.mp4/playlist.m3u8
        var outRe = /([A-Z]+[0-9]+_)([0-9]{8})_([0-9]{1})([0-9]{8})/g;
        var out = outRe.exec(`/${q.downloadurl}`);
        console.log("out1" + out);
        var outName = out[1] + out[2]+"_part"+out[3];
    }


    console.log("Input filename is:" + myArray[0]);
    console.log("Output name is:" + outName);
    converter
        .setInputFile(myArray[0])
        .setOutputFile("/Users/apple/Desktop/mt/usc/402/LectureVideo/" + outName + ".mp4")
        .start()
        .then(() => {
            console.log("File converted");
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(defaultResult));
        });
})

module.exports = app;

const PORT = process.env.PORT || 8081
app.listen(PORT, function () {
    console.log("App started on port 8081");
});