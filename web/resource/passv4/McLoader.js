/*
* McLoader.js
* Copyright 1997-2017 Medicom Inc. All rights reserved.
* Author: Medicom
* Version: 4.1.10.1
* Date: 2017-11-22
* Write by: arjun
*/

//嵌套时，请调整为美康合理用药PASS4WebService地址，不要最后的 “/”
this.mcWebServiceUrl ="http://221.237.156.242:9080/PASS4webservice";

var McLoadJSName = 'McLoader.js';
var McBaseUrl = McGetLoadBaseUrl();

McLoadCss(McBaseUrl + 'McCssAll.css')
McLoadJs(McBaseUrl + 'McConfig.js');
McLoadJs(McBaseUrl + 'McJsAll.js');
// McLoadJs(McBaseUrl + 'McPassIm.js');

this.mc_passim_proxy_url ="http://221.237.156.242:9080/mc_passim_proxy.html";

function McGetLoadBaseUrl() {

    if (!!mcWebServiceUrl) {
        return mcWebServiceUrl + '/passjs/'
    }

    var regex = new RegExp(McLoadJSName.replace('.', '\.') + '$', 'gi');
    var elems = document.getElementsByTagName('SCRIPT');
    for (var i = 0; i < elems.length; i++) {
        var src = elems[i].getAttribute('src');
        if (regex.test(src)) {
            return src.replace(regex, '');
        }
    }
    return '';
}


function McLoadJs(src) {
    document.write('<script src="' + src + '" type="text/javascript"></sc' + 'ript>');
}


function McLoadCss(href) {
    document.write('<link href="' + href + '" rel="stylesheet" type="text/css" />');
}


function McAsyncLoadJs(src) {

    var head = document.getElementsByTagName('HEAD')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    head.appendChild(script);
}


function McAsyncLoadCss(href) {
    var head = document.getElementsByTagName('HEAD')[0];
    var link = document.createElement("link");
    link.href = href
    link.rel = 'stylesheet';
    head.appendChild(link);
}
