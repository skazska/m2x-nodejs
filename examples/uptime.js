#!/usr/bin/env node

/*
* This example creates three streams on one of your M2X Devices, and then
* sends your computer's average load to the three streams every 5000 ms
* 
* API Documentation:
* https://m2x.att.com/developer/documentation/v2/device#Create-Update-Data-Stream
* https://m2x.att.com/developer/documentation/v2/device#Post-Device-Updates--Multiple-Values-to-Multiple-Streams-
* 
* Setup:
* Replace <M2X-API-KEY> with an M2X API Key
* Replace <DEVICE-ID> with the ID of the Device being accessed
* 
* Prerequisite:
* You will need to have an M2X Device created in order to use this script
*/

var M2X = require("../");
var m2x_client = new M2X("<M2X-API-KEY>");
var device_id = "<DEVICE-ID>";
var UptimeDataSource = require("./uptime_data_source");
var source = new UptimeDataSource();

source.update(function(data) {
    var streams = ["load_1m", "load_5m", "load_15m"];

    // Create the streams if they don't exist already
    m2x_client.devices.updateStreams(device_id, streams, function(response) {
        if (response.isError()) {
            console.log("Cannot create stream:", JSON.stringify(response.error()));
            return;
        }

        // Retrieve values each 5000ms and post them to the device
        source.updateEvery(5000, function(data, stopLoop) {
            var at = new Date().toISOString();
            console.log(at);
            var values = {
                load_1m:  [ { value: data.load_1m, timestamp: at } ],
                load_5m:  [ { value: data.load_5m, timestamp: at } ],
                load_15m: [ { value: data.load_15m, timestamp: at } ]
            };

            // Write the different values into AT&T M2X
            m2x_client.devices.postUpdates(device_id, { values: values }, function(result) {
                console.log(result);
                if (result.isError()) {
                    // Stop the update loop if an error occurs.
                    stopLoop();

                    console.log(JSON.stringify(response.error()));
                }
            });
        });
    });
});

