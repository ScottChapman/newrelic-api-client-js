const helper = require('./helper.js');
const urls = require('./api-urls.json');

module.export = class api {

  constructor(keys) {
    this.keys = keys;
  }
  // Applications
  async appsList () {
    return helper.sendGetRequest(urls.api.apps.list, this.keys);
  }
  
  async appsShow (appId) {
    var url = urls.api.apps.show.replace('{application_id}', appId);
    return helper.sendGetRequest(url, this.keys);
  }
  
  async appsMetricNames (appId) {
    var url = urls.api.apps.metricNames.replace('{application_id}', appId);
    return helper.sendGetRequest(url, this.keys);
  }
  
  async appsMetricData (appId, names) {
    var url = urls.api.apps.metricData.replace('{application_id}', appId);
    var qs = {
      'names': names
    }
    return helper.sendGetQSRequest(url, qs);
  }
  
  async appHostsList (appId) {
    var url = urls.api.appHosts.list.replace('{application_id}', appId);
    return helper.sendGetRequest(url, this.keys);
  }
  
  async appInstancesList (appId) {
    var url = urls.api.appInstances.list.replace('{application_id}', appId);
    return helper.sendGetRequest(url, this.keys);
  }
  
  async appDeploymentsList (appId) {
    var url = urls.api.appDeployments.list.replace('{application_id}', appId);
    return helper.sendGetRequest(url, this.keys);
  }
  
  async mobileList () {
    return helper.sendGetRequest(urls.api.mobile.list, this.keys);
  }
  
  async browserList () {
    return helper.sendGetRequest(urls.api.browser.list, this.keys);
  }
  
  async keyTransactionsList () {
    return helper.sendGetRequest(urls.api.keyTransactions.list, this.keys);
  }
  
  async serversList (qs) {
    //return helper.sendGetRequest(urls.api.servers.list, this.keys);
    return helper.sendGetQSRequest(urls.api.servers.list, qs, this.keys);
  }
  
  async usagesList (product) {
    var url = urls.api.usages.list.replace('{product}', product);
    var d = new Date();
    var qs = {
      'start_date': d.toISOString(),
      'end_date': d.toISOString()
    }
    return helper.sendGetQSRequest(url, qs, this.keys);
  }
  
  async usersList (qs) {
    return helper.sendGetQSRequest(urls.api.users.list, qs, this.keys);
  }
  
  async pluginsList () {
    return helper.sendGetRequest(urls.api.plugins.list, this.keys);
  }
  
  async pluginsListFilterGuid (guid) {
    var url = urls.api.plugins.list;
    var qs = {
      'filter[guid]': guid
    }
    return helper.sendGetQSRequest(url, qs, this.keys);
  }
  
  async pluginsListFilterIds (ids) {
    var url = urls.api.plugins.list;
    var qs = {
      'filter[ids]': ids
    }
    return helper.sendGetQSRequest(url, qs, this.keys);
  }
  
  async pluginsShow (pluginId) {
    var url = urls.api.plugins.show.replace('{id}', pluginId);
    return helper.sendGetRequest(url, this.keys);
  }
  
  async pluginComponentsList () {
    var url = urls.api.pluginComponents.list;
    return helper.sendGetRequest(url, this.keys);
  }
  
  async pluginComponentsListFilterPluginId (pluginId) {
    var url = urls.api.pluginComponents.list;
    var qs = {
      'filter[plugin_id]': pluginId
    }
    return helper.sendGetQSRequest(url, qs, this.keys);
  }
  
  async pluginComponentsShow (componentId) {
    var url = urls.api.pluginComponents.show.replace('{component_id}', componentId);
    return helper.sendGetRequest(url, this.keys);
  }
  
  async pluginComponentsMetricNames (componentId) {
    var url = urls.api.pluginComponents.metricNames.replace('{component_id}', componentId);
    return helper.sendGetRequest(url, this.keys);
  }
  
  async pluginComponentsMetricData (componentId, names) {
    var url = urls.api.pluginComponents.metricData.replace('{component_id}', componentId);
    var qs = {
      'names': names
    }
    return helper.sendGetQSRequest(url, qs, this.keys);
  }
}