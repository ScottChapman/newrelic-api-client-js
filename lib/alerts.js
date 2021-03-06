const helper = require('./helper.js');
const urls = require('./api-urls.json');

module.exports = class alerts {

  constructor(keys) {
    this.keys = keys;
  }

  // TODO - Add the filters
  async eventsList() {
    var url = urls.api.alertsEvents.list;
    const resp = await helper.sendGetRequest(url, this.keys);
    return resp.list;
  }
  
  // Note: This covers APM, Browser and Mobile
  async conditionsList(policyId) {
    var url = urls.api.alertsConditions.list;
    var qs = { 'policy_id': policyId }
    const resp = await helper.sendGetQSRequest(url, qs, this.keys);
    return resp.conditions;
  }
  
  // Note: This covers Infrastructure
  async infrastructureConditionsList(policyId) {
    var url = urls.api.alertsInfrastructureConditions.list;
    var qs = { 'policy_id': policyId }
    const resp = await helper.sendGetQSKeyRequest(url, qs, this.keys, "adminKey", true);
    return resp.data;
  }
  
  async infrastructureConditionsCreate(cond) {
    var url = urls.api.alertsInfrastructureConditions.create;
    const resp = await helper.sendPutOrPostBody(url, 'POST', {data:cond}, this.keys, 'adminKey');
    return resp.data;
  }
  
  async infrastructureConditionsUpdate(condId, cond) {
    var url = urls.api.alertsInfrastructureConditions.updateDelete.replace('{condition-id}',condId)
    const resp = await helper.sendPutOrPostBody(url, 'PUT', {data:cond}, this.keys, 'adminKey');
    return resp.data
  }
  
  
  // Note: Covers Synthetics
  async syntheticsConditionsList(policyId) {
    var url = urls.api.alertsSyntheticConditions.list;
    var qs = { 'policy_id': policyId }
    const resp = await helper.sendGetQSKeyRequest(url, qs, this.keys, "adminKey", true);
    return resp.synthetics_conditions
  }
  
  async syntheticsConditionsCreate(policyId, cond) {
    var url = urls.api.alertsSyntheticConditions.create.replace('{policy_id}',policyId);
    const resp = await helper.sendPutOrPostBody(url, 'POST', {synthetics_condition:cond}, this.keys, 'adminKey');
    return resp.synthetics_condition
  }
  
  
  // Note: Covers NRQL
  async NRQLConditionsList(policyId) {
    var url = urls.api.alertsNrqlConditions.list;
    var qs = { 'policy_id': policyId }
    const resp = await helper.sendGetQSKeyRequest(url, qs, this.keys, "adminKey", true);
    return resp.nrql_conditions;
  }
  
  async NRQLConditionsCreate(policyId, cond) {
    var url = urls.api.alertsNrqlConditions.create.replace('{policy_id}',policyId);
    const resp = await helper.sendPutOrPostBody(url, 'POST', {nrql_condition:cond}, this.keys, 'adminKey');
    return resp.nrql_condition;
  }
  
  async NRQLConditionsUpdate(cond) {
    var url = urls.api.alertsNrqlConditions.updateDelete.replace('{condition_id}',cond.id);
    const resp = await helper.sendPutOrPostBody(url, 'PUT', {nrql_condition:cond}, this.keys, 'adminKey');
    return resp.nrql_condition;
  }
  
  async conditionsCreate(policyId, cond) {
    var url = urls.api.alertsConditions.create.replace('{policy_id}',policyId)
    const resp = await helper.sendPutOrPostBody(url, 'POST', {condition:cond}, this.keys, 'adminKey');
    return resp.condition;
  }
  
  async conditionsUpdate(cond) {
    var url = urls.api.alertsConditions.updateDelete.replace('{condition_id}',cond.id)
    const resp = await helper.sendPutOrPostBody(url, 'PUT', {condition:cond}, this.keys, 'adminKey');
    return resp.condition;
  }
  
  async policiesList(name) {
    var url = urls.api.alertsPolicies.createRead;
    if (name != null) {
      var qs = { 'filter[name]': name };
      var resp = await helper.sendGetQSRequest(url, qs, this.keys);
    } else {
      var resp = await helper.sendGetRequest(url, this.keys);
    }
    return resp.policies;
  }
  
  async policiesCreate(policy) {
    var url = urls.api.alertsPolicies.createRead;
    const resp = await helper.sendPutOrPostBody(url, "POST", {policy:policy}, this.keys, 'adminKey');
    return resp.policy;
  }
  
  
  async channelsList() {
    var url = urls.api.alertsChannels.createRead;
    const resp = await helper.sendGetRequest(url, this.keys);
    for (var channel of resp.channels) {
      if (channel.configuration && channel.type === "pagerduty")
        channel.configuration.service_key = "Some PagerDuty Service Key"
      if (channel.configuration && channel.type === "slack")
        channel.configuration.url = "Some Slack URL"
    }
    return resp.channels;
  }
  
  async channelsCreate(channel) {
    var url = urls.api.alertsChannels.createRead;
    const resp = await helper.sendPutOrPostBody(url, "POST", {channel:channel}, this.keys, 'adminKey');
    return resp.channels[0];
  }
  
  async channelsDelete(id) {
    var url = urls.api.alertsChannels.delete.replace({channel_id},id);
    return helper.sendDelete(url, this.keys, 'adminKey');
  }
  
  async policyChannelsUpdate(policyId, channelIds) {
    if (Array.isArray(channelIds))
      channelIds = channelIds.join();
    var url = urls.api.alertsPolicyChannels.updateDelete;
    var qs = {
      'policy_id': policyId,
      'channel_ids': channelIds
    }
    var resp = await helper.sendPutOrPostQS(url, 'PUT', qs, this.keys, 'adminKey');
    return resp.policy;
  }
  
  async incidentsList(onlyOpen, pageId) {
    var url = urls.api.alertsIncidents.list;
    var qs = {
      'only_open': onlyOpen,
      'page': pageId
    }
    // Call sendGetQSKeyRequest and request only this pageId (not all pages)
    return helper.sendGetQSKeyRequest(url, qs, this.keys, 'restKey', false);
  }
}