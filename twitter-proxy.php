<?php
session_start();
require_once("twitteroauth/twitteroauth/twitteroauth.php");

require_once("config.inc.php");

function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
  $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
  return $connection;
}

const API_BASE_URL = "https://api.twitter.com/1.1";
$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);

function getTimeline($options) {
	global $connection;
	$args = http_build_query($options);
	$response = $connection->get(API_BASE_URL . "/statuses/user_timeline.json?" . $args);
	echo json_encode($response);
}

function search($options) {
	global $connection;
	$args = http_build_query($options);
	$response = $connection->get(API_BASE_URL . "/search/tweets.json?" . $args);
	echo json_encode($response);
}

// parse incoming response and see if it matches a known function
$operation = $_REQUEST['op'];
if (function_exists($operation)) {
	$operation($_REQUEST);
}
?>