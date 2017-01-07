var express = require('express'); // node module downloaded by npm, its a built in module in node
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var PostSchema = require('./model/postmodel');
var app = express(); // creates the instance of express

app.use(express.static(__dirname + '/public'));  // to load static files in application 
												  //inside public folder

mongoose.connect('mongodb://localhost/blogdatabase');
var PostModel = mongoose.model("PostModel", PostSchema);										  

app.use(bodyParser.json()); //for parsing application/json
app.use(bodyParser.urlencoded({extended : true})); //for parsing application/form

app.get('/api/getposts', function(req, resp) {
	PostModel
		.find()
		.then(function(successObj) {
			resp.json(successObj);
		}, function(errObj) {
			resp.sendStatus(400);
		});
});											  

app.get('/api/getposts/:id', function(req, resp) {
	var postID = req.params.id;
	PostModel
		.findOne({"_id": postID})
		.then(function(successObj) {
			resp.json(successObj);
		}, function(errObj) {
			resp.sendStatus(400);
		});
});	

app.post('/api/postblog', function(req, resp) {
	var reqData = req.body;
	PostModel
		.create(reqData)
		.then(function(successObj) { 
			resp.json(200); //send the data back to UI
		}, function(errObj) {
			resp.sendStatus(400);
		});
});

app.delete('/api/deletepost/:id', function(req, resp) {
	var postID = req.params.id;
	PostModel
		.remove({"_id" : postID})
		.then(function(successObj) {
			resp.json(200); //send the data back to UI
		}, function(errObj) {
			resp.sendStatus(400);
		});
});

app.put('/api/updatepost/:id', function(req, resp) {
	var postID = req.params.id;
	var postTitle = req.body.blogtitle;
	var postBody = req.body.blogbody;
	PostModel
		.update({"_id": postID}, {
			"blogtitle" : postTitle,
			"blogbody" : postBody
		})
		.then(function(success) {
			resp.json(success);
		}, function(errObj) {
			resp.sendStatus(400);
		});
});

											  

app.listen(3000, function () {
	console.log('Server running at port 3000');
});