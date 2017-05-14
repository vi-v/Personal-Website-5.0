var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	bodyParser = require('body-parser'),
	dateTime = require('node-datetime'),
	fs = require('fs');

app.use(bodyParser.json());

const port = 8080;

app.use(express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules/'));

server.listen(port);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.post('/logmessage', function(req, res) {
	var text = 'Name: '+req.body.name+"\n"+'Email: '+req.body.email+"\nSubject: "+req.body.subject+"\n\nMessage: \n"+req.body.message;
	console.log("Logging: "+text);
	var dt = dateTime.create();
	var formatted = dt.format('m-d-Y');
	var dir = './messages/'+formatted;
	if(!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
	var subject = req.body.subject.replace(/[/\\]/g, '|') + '-_-' + Math.floor(Math.random()*10000);
	fs.writeFile(dir+'/'+subject+'.txt', text, function(err) {
		if(err) console.log(err);
	})
});

console.log("Server started on port "+port+"...");
