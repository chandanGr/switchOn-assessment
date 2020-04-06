'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const _ = require('lodash');
const cors = require('cors');

const PORT = process.env.PORT || 8080;
// Unhandled Rejections and Exceptions process wide
process
	.on('unhandledRejection', (reason, promise) => {
		console.error('Unhandled Rejection at Promise:', reason, promise);
	})
	.on('uncaughtException', (error) => {
		console.error('Uncaught Exception thrown:', error);
		process.exit(1);
	});

// Initializing app
const app = express();

if(process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')));
}


// Setting body parser middle ware
app.use(bodyParser.raw({ type: 'application/jwt' }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({
	limit: "50mb", extended: true, parameterLimit: 50000
}));

app.use(cors());


// Defining routesProperty Configuration is not defined in type NodeJS.Global
require('./src/routes')(app);

app.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Starting the server
app.listen(PORT, () => {
	console.info('Node server listening on port ' + PORT);
});

