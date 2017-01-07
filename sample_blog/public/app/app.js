var blogApp = angular.module('SampleBlogApp', []);


	blogApp.controller('SampleBlogCtrl', SampleBlogCtrl);
	blogApp.service('SampleBlogService', SampleBlogService);

	function SampleBlogCtrl($scope, SampleBlogService) {
		init();

		function init() {
			getAllPosts();
		}

		function getAllPosts() {
			SampleBlogService.getAllPosts().then(function(posts) {
				$scope.posts = posts && posts;
			}, function(error) {
				console.log(error);
			});
		}

		$scope.createPost = function(post) {
			SampleBlogService.createPost(post).then(function(data) {
				getAllPosts();
				$scope.post.blogtitle = $scope.post.blogbody = "";
			}, function(error) {
				console.log(error);
			})
		}

		$scope.editPost = function(postID, post) {
			SampleBlogService.editPost(postID).then(function(data) {
				$scope.post = data || "";
			}, function(error) {
				console.log(error);
			});
		}

		$scope.deletePost = function(postID) {
			SampleBlogService.deletePost(postID).then(function(data) {
				getAllPosts();
			}, function(error) {
				console.log(error);
			});
		}

		$scope.updatePost = function(postID, post) {
			SampleBlogService.updatePost(postID, post).then(function(data) {
				getAllPosts();
			}, function(error) {
				console.log(error);
			});
		}
	}

	function SampleBlogService($http, $q) {
		var service = {
			getAllPosts : getAllPosts,
			createPost : createPost,
			editPost : editPost,
			deletePost : deletePost,
			updatePost : updatePost
		};

		var config = {
               headers : {
                   'Content-Type': 'application/json;charset=utf-8;'
               }
           };

         function getAllPosts(postID) {
         	var deferred = $q.defer();
         	var url = postID &&'/api/getposts/'+postID || '/api/getposts';

			$http({
				method : 'GET',
				url : url  // url to GET all posts,
			})
			.success(function(data, status, headers, config) {
				deferred.resolve(data);
			})
			.error(function(data, status, headers, config) {
				deferred.reject(data);
			})

			return deferred.promise;
         }

		function createPost(data) {
			var deferred = $q.defer();

			$http({
				method : 'POST',
				url : '/api/postblog',  // url to POST ajax call,
				//config: config,
				data : data
			})
			.success(function(data, status, headers, config) {
				deferred.resolve(data);
			})
			.error(function(data, status, headers, config) {
				deferred.reject(data);
			})

			return deferred.promise;
		}

		function deletePost(postID) {
			var deferred = $q.defer();

			$http({
				method : 'delete',
				url : '/api/deletepost/'+postID,  // url to DELETE 
				//config: config,
				data : postID
			})
			.success(function(data, status, headers, config) {
				deferred.resolve(data);
			})
			.error(function(data, status, headers, config) {
				deferred.reject(data);
			})
			return deferred.promise;
		}

		function editPost(postID) {
			var deferred = $q.defer();
			this.getAllPosts(postID).then(function(data, status, headers, config) {
				deferred.resolve(data);
			}, function(data, status, headers, config) {
				deferred.reject(data);
			});
			return deferred.promise
		}

		function updatePost(postID, post) {
			var deferred = $q.defer();

			$http({
				method : 'PUT',
				url : '/api/updatepost/'+postID,
				data : post
			})
			.success(function(data, status, headers, config) {
				deferred.resolve(data);
			})
			.error(function(data, status, headers, config) {
				deferred.reject(data);
			})
			return deferred.promise;
		}

		return service;
	}


