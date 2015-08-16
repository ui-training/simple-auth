var mongoose = require('mongoose');
module.exports = function(callback){
	var dbPath = process.env.MONGODB || 'mongodb://localhost/assignment'
	mongoose.connect(dbPath, function(err){
		if(err){
			return console.error('Error while connecting to db');
		}

		console.log('connected to db');
		require('../models/user');
		callback();
	});
};