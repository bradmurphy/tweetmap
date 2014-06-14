wd4-ajax-twitter
================

Twitter API for WebDev4: AJAX
-----------------------------


A simple API for interacting with the Twitter API.  The goal is to teach the fundamental interaction patterns with the common web APIs, as well as sound Javascript/jQuery programming concepts.

***NOTE**: this code is meant for instructional purposes only, to highlight key interaction concepts when working with AJAX and web APIs.  It has not be secured for any kind of production use, and is thus inherently vulnerable to all manner of common web attacks.  Please take all the standard precautions as you would with any real application.*

## Interface

Call the desired method using the query parameter **op**, as in **?op=search&username=screen_name&count=10**

All other query arguments will be passed into the method

## Methods

#### search($options)

Expected $options arguments:

* q
* count
* result_type

#### getTimeline($options)

Expected $options arguments:

* screen_name


