if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function() {};

var currentLat;
var currentLong;

var twitterMapApi = (function(options) {

	var shared = {},
		options = options || {},
		API_BASE = window.location.href.replace(/\/[^\/]+.html\??(.*)/, '/')
	
	// MAP STUFF

	var geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(33.813046, -84.36177599999996);
		var mapOptions = {
		zoom: 8,
		center: latlng
	}
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	// SETUP ADDRESS SEARCH

	function codeAddress() {
		var address = $('input[name="address"]').val();
		console.log(address);

		geocoder.geocode( { 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {

				currentLat = results[0].geometry.location.k;
				currentLong = results[0].geometry.location.A;

				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location
				});
			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
		});
	}

	// UPDATE UI FUNCTION

	function updateUI(data) {

		var data = data.statuses;

		var tweets = "";

		// LOOP THROUGH TWEETS, APPEND TWEETS THAT AREN'T RETWEETS TO DIV

		for (var i = 0; i < data.length; i++) {

			var retweet = data[i].text.search("RT ");

			if (retweet == 0) {
				//do nothing...
			} else {
				var tweet = '<div class="user-wrap">' + "<a href='http://twitter.com/" + data[i].user.screen_name + 
				"' target='_blank'>" + '<img class="profile" src="' + data[i].user.profile_image_url + '">' + 
				"<span id='user'>" + "&#64;" + data[i].user.screen_name + "</span></a></div>" + "<p>" + data[i].text + "</p><hr>";

				tweets += tweet;
			};

		};

		$("#tweetBox").html(tweets);

	};

	function init() {
		codeAddress();

	    // EVENT HANDLER

		$('input[name="Geocode"]').on('click', function(){
			codeAddress();

			console.log(currentLat+", "+currentLong);

			var radius = "20mi";

			$.ajax({
				url: "twitter-proxy.php?op=search",
				data: {
					geocode: currentLat+","+currentLong+","+radius,
					count: 100
				},
				success:  function(data) {
					// console.log(data);
					updateUI(data);
				},
				dataType: 'json'
			});

			return false;

		});
	};

	google.maps.event.addDomListener(window, 'load', init);
	
	shared.init = init;

	return shared;

}());

$(document).ready(function() {
	// Create DIV

	var tweetBox = document.createElement("div");
	tweetBox.setAttribute("id", "tweetBox");
	document.body.appendChild(tweetBox);
	tweetBox.style.zIndex = "99999";
	tweetBox.style.backgroundColor = "#fff";
	tweetBox.style.height = "600px";
	tweetBox.style.width = "650px";
	tweetBox.style.position = "absolute";
	tweetBox.style.right = "7.5%";
	tweetBox.style.top = "7.5%";
	tweetBox.style.borderRadius = "2px";

	twitterMapApi.init();
});






















