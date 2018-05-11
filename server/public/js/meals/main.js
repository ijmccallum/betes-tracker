"use strict";
// for each a meal
// start time - end time
// glucose range: 30 - 300
// plot the measurements

//make the call
$.ajax("/api/meals")
	.done(function(data) {
		console.log("here: ", data);
	})
	.fail(function() {
		console.error("API ajax fail");
	});
