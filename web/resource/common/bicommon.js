var diUrl = "";
var localUrl = window.location.href;
if (localUrl.indexOf("http://192.168.0") >= 0 
    || localUrl.indexOf("http://172.") >= 0
    || localUrl.indexOf("http://127.0.0.1") >= 0
    || localUrl.indexOf("http://localhost") >= 0) {
	diUrl = "http://192.168.0.48:9008/databi";
//	diUrl = "http://bofan.eicp.net:9008/databi";
//	diUrl = "http://bofan.eicp.net:9008/regional_health/";	
} else {
    diUrl = "http://bofan.eicp.net:9008/databi";
}
var diUser = "admin";
var diPswd = "7ujm8ik,9ol.";
var diResource = diUrl + "/vision/openresource.jsp?user=" + diUser + "&password=" + diPswd + "&resid=";
