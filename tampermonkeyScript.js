// ==UserScript==
// @name         autodownload_USC_DEN
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      https://courses.uscden.net/d2l/le/content/*
// @match        https://courses.uscden.net/d2l/le/content/*
// @grant        none
// @run-at       context-menu
// @require      https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    var buttonGroup = document.getElementsByClassName("DENVideo");
    if(buttonGroup[1] == "" || buttonGroup[1] == null || buttonGroup[1] == undefined){
        alert("please try again!");
    }
    let sourceUrl = buttonGroup[1].href;
    if(sourceUrl == "" || sourceUrl == null){
        alert("please try again!");
    }
    //setTimeout(a, 3000);
    //console.log(file);
    let fileName= "";
    var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
    let para = '?downloadurl='+encodeURIComponent(sourceUrl) +"&filename="+fileName;
    let url ='http://localhost:8081/download_usc_den_video'+ para;
    httpRequest.open('GET',url, true); //第二步：打开连接
    httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
    httpRequest.send();//发送请求 将情头写在体send中
    console.log("usc_den_downloading");
    alert("start to downloading!");
    /**
 * 获取数据后的处理程序
 */
    httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
            var json = httpRequest.responseText;//获取到服务端返回的数据
            console.log(json);
            alert(json);
        }
    };

    function a(){
        console.log("i am ppp");
        var docu = document.getElementsByClassName("d2l-page-title")[0].innerText
        //console.log(docu);
        
    }

})();