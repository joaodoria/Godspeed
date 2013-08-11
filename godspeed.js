var http = require('http');
var request = require('request');
var ejs = require('ejs');
var connect = require('connect');
var fs = require('fs');

var layout = fs.readFileSync(__dirname + '/godspeed.html','utf8');
console.log('Loaded template: ' + layout);

var app = connect();
app.use(connect.static(__dirname + '/assets'));

// Listen for requests from web browsers
app.use(function(serverRequest, serverResponse) {

	//We received a request from a web browser
	console.log('Get request for ' + serverRequest.url);

	//Send status code and headers
	serverResponse.writeHead(200, {'Content-Type': 'text/html'});

	//Get the weatherfrom aeris
	request('http://api.aerisapi.com/batch?requests=/observations/oslo,norway,/observations/rio+de+janeiro,br,/observations/new+haven,ct&client_id=c6T7tvujoI7SgytJmNj7l&client_secret=Q5GRGQyhPn4Jd8Vp1a2hGgk6Y85Bew1pP6dIbsQW', 
			function(error, response, body) {

	var weather = JSON.parse(body);
    var windSpeed1 = weather.response.responses[0].response.ob.windKPH;
    var windDir1 = weather.response.responses[0].response.ob.windDirDEG;
    var windDir1a = weather.response.responses[0].response.ob.windDir;
    var windSpeed2 = weather.response.responses[1].response.ob.windKPH;
    var windDir2 = weather.response.responses[1].response.ob.windDirDEG;
    var windDir2a = weather.response.responses[1].response.ob.windDir;
    var windSpeed3 = weather.response.responses[2].response.ob.windKPH;
    var windDir3 = weather.response.responses[2].response.ob.windDirDEG;
    var windDir3a = weather.response.responses[2].response.ob.windDir;

	serverResponse.write(ejs.render(layout, {
		windSpeed1: windSpeed1, windDir1: windDir1, windDir1a: windDir1a,
		windSpeed2: windSpeed2, windDir2: windDir2, windDir2a: windDir2a,
		windSpeed3: windSpeed3, windDir3: windDir3, windDir3a: windDir3a
		}));

	serverResponse.end();

	});

});

console.log('Listening');
app.listen(4000);
