// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api', (req, res) => {
	const date = new Date()
	res.json({
		unix: date.valueOf(),
		utc: date.toUTCString()
	})
})

app.get('/api/:date', (req, res) => {
	const date = req.params.date

	// is a invalid date
	if (new Date(date).toString() == "Invalid Date") {
		return res.json({
			error: "Invalid Date"
		})
	}

	// is a unix date
	if (/\d{5,}/.test(date)) {
		const dateNumber = parseInt(date)
		return res.json({
			unix: dateNumber,
			utc: new Date(dateNumber).toUTCString()
		})
	}

	const date = new Date(date)	
	res.json({ 
		unix: date.valueOf(), 
		utc: date.toUTCString()
	})
})



// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
