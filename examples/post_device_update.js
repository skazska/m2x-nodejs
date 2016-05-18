#!/usr/bin/env node

/*
* 
* This example demonstrates how to make a call to the
* Post Device Update (Single Value to Multiple Streams) endpoint
*
* API Documentation:
* https://m2x.att.com/developer/documentation/v2/device#Post-Device-Update--Single-Values-to-Multiple-Streams-
*
* Setup:
* Replace <M2X-API-KEY> with an M2X API Key
*
*/

var M2X = require("../");
var m2x_client = new M2X("<M2X-API-Key>");

// Use the Search Devices endpoint to find the correct
// device ID if not known
device_id = "[Device-ID]";

params = {
    // timestamp: (optional) iso 8601 formatted string
    timestamp: "2016-02-28T15:15:00.981Z",
    // values: (required) the values to post, Stream ID & value Pairs
    values: {
        stream_id: 1,
        stream_id_2: "alphanumeric value"
    },
    // location: (optional) latitude, longitude & elevation of the device. elevation is optional.
    location: {
        latitude: 37.3544,
        longitude: 121.9692
    }
};

m2x_client.devices.postUpdate(device_id, params, function(response) {
    if (response.isSuccess()) {
        console.log(response.json);
    } else {
        console.log(JSON.stringify(response.error()));
    }
});
