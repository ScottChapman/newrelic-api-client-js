const helper = require('./helper.js');
const urls = require('./api-urls.json');

module.exports = class synthetics {
  constructor(keys) {
    this.keys = keys;
  }

  async getAllMonitors() {
    var url = urls.synthetics.monitors.createRead;
    return helper.sendGetKeyRequest(url, 'adminKey');
  }
  
  async getMonitor(monitorId) {
    var url = urls.synthetics.monitors.monitor.replace('{monitor_id}', monitorId);
    return helper.sendGetKeyRequest(url, 'adminKey');
  }
  
  async getLocations() {
    var url = urls.synthetics.locations.list;
    return helper.sendGetKeyRequest(url, 'adminKey');
  }
  
  // Create Monitor requires a JSON body with this data:
  // https://docs.newrelic.com/docs/apis/synthetics-rest-api/monitor-examples/manage-synthetics-monitors-rest-api
  // { "name": string [required],
  // "type": string (SIMPLE, BROWSER, SCRIPT_API, SCRIPT_BROWSER) [required],
  // "frequency": integer (minutes) [required, must be one of 1, 5, 10, 15, 30, 60, 360, 720, or 1440],
  // "uri": string [required for SIMPLE and BROWSER type],
  // "locations": array of strings [at least one required],
  // "status": string (ENABLED, MUTED, DISABLED) [required],
  // "slaThreshold": double,
  // "options": {
  //   "validationString": string [only valid for SIMPLE and BROWSER types],
  //   "verifySSL": boolean (true, false) [only valid for SIMPLE and BROWSER types],
  //   "bypassHEADRequest": boolean (true, false) [only valid for SIMPLE types],
  //   "treatRedirectAsFailure": boolean (true, false) [only valid for SIMPLE types]
  //   }
  // }
  async createMonitor(monitorBody) {
    var url = urls.synthetics.monitors.createRead;
    
    // uri, method, body, configId, keyType, cb
    return helper.sendPutOrPostBody(url, 'POST', monitorBody, this.keys, 'adminKey');
  }
  
  async deleteMonitor(monitorId) {
    var url = urls.synthetics.monitors.monitor.replace('{monitor_id}', monitorId);
    return helper.sendDelete(url, this.keys, 'adminKey');
  }
  
  async updateMonitor(monitorBody) {
    var url = urls.synthetics.monitors.monitor.replace('{monitor_id}', monitorBody.id);
    return helper.sendPutOrPostBody(url, 'PUT', monitorBody, this.keys, 'adminKey');
  }
}