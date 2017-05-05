var http = require('http');
var server = http.createServer(); // create the web server object

server.on('request', function(request, response) {
	response.write('<!DOCTYPE html>');
	response.write('<html>');
	response.write('<body>');
	response.write('<canvas id="game" width="800" height="600" style="border:1px solid #000000;">');
	response.write('Your browser does not support the HTML5 canvas tag.');
	response.write('</canvas>');
	response.write('</body>');
	response.write('</html>');
	response.end();
});

server.listen(8080);
console.log('Server is running on port 8080...');