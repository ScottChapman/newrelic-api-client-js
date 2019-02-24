const helper = require('./helper.js');
const urls = require('./api-urls.json');

// Define the initial API
module.exports = class dashboards {
  constructor(keys) {
    this.keys = keys;
  }
  async list() {
    var url = urls.api.dashboards.all;
    return helper.sendGetKeyRequest(url, this.keys, 'adminKey');
  }
  
  // Get a particular page from the dashboard list
  async getPage(pageId) {
    var url = urls.api.dashboards.all;
    var qs = { 'page': pageId }
    return helper.sendGetQSKeyRequest(url, qs, this.keys, 'adminKey', false);
  }
  
  // Get a single dashboard
  async getOne(dashboardId) {
    var url = urls.api.dashboards.one.replace('{dashboard_id}', dashboardId);
    return helper.sendGetKeyRequest(url, this.keys, 'adminKey');
  }
  
  async create(dashboardBody) {
    var url = urls.api.dashboards.all;
    return helper.sendPutOrPostBody(url, 'POST', dashboardBody, this.keys, 'adminKey');
  }
  
  async update(dashboardId, dashboardBody) {
    var url = urls.api.dashboards.one.replace('{dashboard_id}', dashboardId);
    return helper.sendPutOrPostBody(url, 'PUT', dashboardBody, this.keys, 'adminKey');
  }
  
  async delete(dashboardId) {
    var url = urls.api.dashboards.one.replace('{dashboard_id}', dashboardId);
    return helper.sendDelete(url, this.keys, 'adminKey');
  }
  
}