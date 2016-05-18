#!/usr/bin/env node

/*
* This example demonstrates how to check the current M2X service status
* and print the status to the console
* 
* Setup:
* Replace <M2X-API-KEY> with an M2X API Key
* 
*/

var M2X = require("../");
var m2x_client = new M2X("<M2X-API-KEY>");

m2x_client.status(function(data) {
    console.log("Current status of M2X service: ");
    console.log("    API:      " + data.json.api);
    console.log("    TRIGGERS: " + data.json.triggers);
});
