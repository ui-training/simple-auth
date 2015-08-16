var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	md5password: String,
	email: String
});

mongoose.model('User', UserSchema);