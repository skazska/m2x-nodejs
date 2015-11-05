/**
 * Created by ska on 9/14/15.
 */
"use strict";

var helpers = require("./helpers");
var Collections;

// Wrapper for AT&T M2X Collection API
//
// https://m2x.att.com/developer/documentation/collections
Collections = function(client, keysAPI) {
  this.client = client;
  this.keysAPI = keysAPI;
};

// Retrieve the list of collections accessible by the authenticated API key that
// meet the search criteria
//
// https://m2x.att.com/developer/documentation/v2/collections#List-collections
Collections.prototype.list = function(params, callback) {
  if (typeof params === "function") {
    callback = params;
    params = {};
  }
  return this.client.get("/collections", { qs: params || {} }, callback);
};

// Create a new collection
//
// https://m2x.att.com/developer/documentation/v2/collections#Create-Collection
Collections.prototype.create = function(params, callback) {
  return this.client.post("/collections", {
    headers: { "Content-Type": "application/json" },
    params: params
  }, callback);
};

// Update a collection
//
// https://m2x.att.com/developer/documentation/v2/collections#Update-Collection-Details
Collections.prototype.update = function(id, params, callback) {
  return this.client.put(helpers.url("/collections/%s", id), {
    headers: { "Content-Type": "application/json" },
    params: params
  }, callback);
};

// Return the details of the supplied collection
//
// https://m2x.att.com/developer/documentation/v2/collections#View-Collection-Details
Collections.prototype.view = function(id, callback) {
  return this.client.get(helpers.url("/collections/%s", id), callback);
};

// Return the metadata of the supplied collection
//
// Note that this method can return an empty value (response status
// of 204) if the collection has no metadata defined.
//
// https://m2x.att.com/developer/documentation/v2/collections#Read-Collection-Metadata
Collections.prototype.metadata = function(id, callback) {
  return this.client.get(helpers.url("/collections/%s/metadata", id), callback);
};

// Update the metadata of the collection
//
// https://m2x.att.com/developer/documentation/v2/collections#Update-Collection-Metadata
Collections.prototype.updateMetadata = function(id, params, callback) {
  return this.client.put(
    helpers.url("/collections/%s/metadata", id),
    { params: params },
    callback
  );
};

// Delete an existing collection
//
// https://m2x.att.com/developer/documentation/v2/collections#Delete-Collection
Collections.prototype.deleteCollection = function(id, callback) {
  return this.client.del(helpers.url("/collections/%s", id), callback);
};


// Returns a list of API keys associated with the collection
Collections.prototype.keys = function(id, callback) {
  return this.client.get("/keys", {  qs: { collection: id } }, callback);
};

// Creates a new API key associated to the collection
//
// If a parameter named `stream` is supplied with a stream name, it
// will create an API key associated with that stream only.
Collections.prototype.createKey = function(id, params, callback) {
  this.keysAPI.create(helpers.extend(params, { collection: id }), callback);
};

// Updates an API key properties
Collections.prototype.updateKey = function(id, key, params, callback) {
  this.keysAPI.update(key, helpers.extend(params, { collection: id }), callback);
};

module.exports = Collections;
