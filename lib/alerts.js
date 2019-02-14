const request = require('request');
const helper = require('./helper.js');
const urls = require('./api-urls.json');

// Define the initial API
var alerts = {};
alerts.events = {};
alerts.conditions = {};
alerts.infrastructureConditions = {};
// alerts.pluginConditions = {};
// alerts.externalServiceConditions = {};
alerts.syntheticsConditions = {};
alerts.NRQLConditions = {};
alerts.policies = {};
alerts.channels = {};
alerts.policyChannels = {};
// alerts.violations = {};
alerts.incidents = {};
// alerts.entityConditions = {};

// TODO - Add the filters
alerts.events.list = function(configId, cb) {
  var url = urls.api.alertsEvents.list;
  helper.sendGetRequest(url, configId, cb);
}

// Note: This covers APM, Browser and Mobile
alerts.conditions.list = function(policyId, configId, cb) {
  var url = urls.api.alertsConditions.list;
  var qs = { 'policy_id': policyId }
  helper.sendGetQSRequest(url, qs, configId, cb);
}

// Note: This covers Infrastructure
alerts.infrastructureConditions.list = function(policyId, configId, cb) {
  var url = urls.api.alertsInfrastructureConditions.list;
  var qs = { 'policy_id': policyId }
  helper.sendGetQSKeyRequest(url, qs, configId, "adminKey", true, cb);
}

alerts.infrastructureConditions.create = function(configId, cond, cb) {
  var url = urls.api.alertsInfrastructureConditions.create;
  helper.sendPutOrPostBody(url, 'POST', cond, configId, 'adminKey', cb);
}

alerts.infrastructureConditions.update = function(configId, condId, cond, cb) {
  var url = urls.api.alertsInfrastructureConditions.updateDelete.replace('{condition-id}',condId)
  helper.sendPutOrPostBody(url, 'PUT', cond, configId, 'adminKey', cb);
}


// Note: Covers Synthetics
alerts.syntheticsConditions.list = function(policyId, configId, cb) {
  var url = urls.api.alertsSyntheticConditions.list;
  var qs = { 'policy_id': policyId }
  helper.sendGetQSKeyRequest(url, qs, configId, "adminKey", true, cb);
}

// Note: Covers NRQL
alerts.NRQLConditions.list = function(policyId, configId, cb) {
  var url = urls.api.alertsNrqlConditions.list;
  var qs = { 'policy_id': policyId }
  helper.sendGetQSKeyRequest(url, qs, configId, "adminKey", true, cb);
}

alerts.NRQLConditions.create = function(configId, policyId, cond, cb) {
  var url = urls.api.alertsNrqlConditions.create.replace('{policy_id}',policyId);
  helper.sendPutOrPostBody(url, 'POST', cond, configId, 'adminKey', cb);
}

alerts.NRQLConditions.update = function(configId, cond, cb) {
  var url = urls.api.alertsNrqlConditions.createRead;
  var url = urls.api.alertsNrqlConditions.update.replace('{condition_id}',cond.nrql_condition.id);
  helper.sendPutOrPostBody(url, 'POST', cond, configId, 'adminKey', cb);
}

alerts.conditions.create = function(configId, policyId, cond, cb) {
  var url = urls.api.alertsConditions.create.replace('{policy_id}',policyId)
  helper.sendPutOrPostBody(url, 'POST', cond, configId, 'adminKey', cb);
}

alerts.conditions.update = function(configId, condId, cond, cb) {
  var url = urls.api.alertsConditions.updateDelete.replace('{condition_id}',condId)
  helper.sendPutOrPostBody(url, 'PUT', cond, configId, 'adminKey', cb);
}



alerts.policies.list = function(name, configId, cb) {
  var url = urls.api.alertsPolicies.createRead;
  if (name != null) {
    var qs = { 'filter[name]': name };
    helper.sendGetQSRequest(url, qs, configId, cb);
  } else {
    helper.sendGetRequest(url, configId, cb);
  }
}

alerts.policies.create = function(configId, policy, cb) {
  var url = urls.api.alertsPolicies.createRead;
  helper.sendPutOrPostBody(url, "POST", policy, configId, 'adminKey', cb);
}


alerts.channels.list = function(configId, cb) {
  var url = urls.api.alertsChannels.createRead;
  helper.sendGetRequest(url, configId, cb);
}

alerts.channels.create = function(configId, channel, cb) {
  var url = urls.api.alertsChannels.createRead;
  helper.sendPutOrPostBody(url, "POST", channel, configId, 'adminKey', cb);
}

alerts.policyChannels.update = function(policyId, channelIds, configId, cb) {
  var url = urls.api.alertsPolicyChannels.updateDelete;
  var qs = {
    'policy_id': policyId,
    'channel_ids': channelIds
  }
  helper.sendPutOrPostQS(url, 'PUT', qs, configId, 'adminKey', cb);
}

alerts.incidents.list = function(onlyOpen, pageId, configId, cb) {
  var url = urls.api.alertsIncidents.list;
  var qs = {
    'only_open': onlyOpen,
    'page': pageId
  }
  // Call sendGetQSKeyRequest and request only this pageId (not all pages)
  helper.sendGetQSKeyRequest(url, qs, configId, 'restKey', false, cb);
}

module.exports = alerts;