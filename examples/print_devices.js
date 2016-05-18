#!/usr/bin/env node

/*
* This example demonstrates how to make a call to the List Devices endpoint.
* and then prints the details of each device.
*
* API Documentation:
* https://m2x.att.com/developer/documentation/v2/device#List-Devices
* 
* Setup:
* Replace <M2X-API-KEY> with an M2X API Key
* 
*/

var M2X = require("../");
var m2x_client = new M2X("<M2X-API-KEY>");

m2x_client.devices.list(function(response) {
    if (response.isSuccess()) {
        response.json.devices.forEach(function(device) {
            console.log(device);
        });
    } else {
        console.log(JSON.stringify(response.error()));
    }
});
