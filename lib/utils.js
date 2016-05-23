"use strict";

var helpers = require("./helpers");

var Utils;

// Wrapper for some set of helpfull AT&T M2X API endpoints
// https://m2x.att.com/developer/documentation/v2
Utils = function(client) {
    this.client = client;
};

// Time
//
// https://m2x.att.com/developer/documentation/v2/time
Utils.prototype.time = function(callback) {
    return this.client.get("/time", { qs: {} }, callback);
};


module.exports = Utils;
