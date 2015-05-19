/**
 * New node file
 */
var http = require('http');
var fs = require("fs");

http.createServer(function (req, res) {
	var url = req.url;
	if (url === "/"){
		url = "/index.html";
	}
	var tmp = __dirname;
	tmp = __dirname + url;
	try {
		var content = fs.readFileSync(__dirname + url);
		res.writeHead(200);
		res.end(content);
	} catch(e) {
		res.writeHead(404, '404 Not Found', {'Content-Type': 'text/plain'});
		res.end();
	}
}).listen(3000);
console.log('HTTP Server running at port 3000');
