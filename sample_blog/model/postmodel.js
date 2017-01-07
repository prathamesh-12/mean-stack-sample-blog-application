var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
	blogtitle : {type: String, required : true},
	blogbody : String,
	posted : {type: Date, default: Date.now}
}, {collection: 'posts'});

module.exports = PostSchema;
