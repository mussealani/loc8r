var mongoose = require( 'mongoose' ),
		dbURI = 'mongodb://localhost/Loc8r';
		mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
	 console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
	 console.log('Mongoose connection error ' + err); 
});

mongoose.connection.on('disconnected', function () {
	 console.log('Mongoose disconnected');
});

// disconnecting mongodb when the application stops
var gracefulShutdown = function (msg, callback) {
	 mongoose.connection.close(function () {
	 	 console.log('Mongoose disconnected through ' + msg);
	 	 callback();
	 });
};

process.once('SIGUSR2', function () {
	 gracefulShutdown('nodemon restart', function () {
	 	 process.kill(process.pid, 'SIGUSR2');
	 });
});

process.on('SIGINT', function () {
	 gracefulShutdown('app terminating', function () {
	 	 process.exit(0);
	 });
});

process.on('SIGTERM', function () {
	 gracefulShutdown('Heroku app shutdown', function () {
	 	 process.exit(0);
	 });
});

// require locations.js
require('./locations');