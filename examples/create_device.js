#!/usr/bin/env node

/*
*
* This example demonstrates how to create an M2X Device
* and create a stream on the resulting Device
*
* API Documentation:
* https://m2x.att.com/developer/documentation/v2/device#Create-Device
*
* Setup:
* Replace <M2X-API-KEY> with an M2X API Key
*
*/

var M2X = require("../");
var m2x_client = new M2X("<M2X-API-KEY>");

// Device ID of the device that will be created
device_id = "";

// Create Device
device_params = {
    // name: (required)
    name: "Device name",
    // description: (optional)
    description: "Device description",
    // visibility: (required) either private or public
    visibility: "private",
    // tags: (optional) comma separated list of device tag names
    tags: "",
    // serial: (optional) alphanumeric, unique, user defined identifier for the device
    serial: "123abc",
    // metadata: (optional) custom user defined metadata
    // metadata keys must begin with a lowercase letter, may contain only lowercase letters, numbers, and underscores and may be up to 250 characters long
    // metadata values may be any string up to 5,000 characters
    metadata: {
       iso_country_code: "US",
       county: "Santa Clara County",
       city: "Palo Alto",
       state: "CA"
    }
};

m2x_client.devices.create(device_params, function(response) {
    if (response.isSuccess()) {
        device_id = response.json.id;
        console.log("Device created. Device id: ".concat(device_id));

        // Create Stream on Device
        stream_id = "stream_id";
        stream_params = {
            // type: (optional) either numeric or alphanumeric, default is numeric
            type: "numeric"
        };

        // Create stream
        m2x_client.devices.updateStream(device_id, stream_id, stream_params, function(response) {
            if (response.isSuccess()) {
                console.log("Stream created. Stream id: ".concat(stream_id));
            } else {
                console.log(JSON.stringify(response.error()));
            }
        });

    } else {
        console.log(JSON.stringify(response.error()));
    }
});

