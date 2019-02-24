const helper = require('./helper.js');
const urls = require('./api-urls.json');

// Define the initial API
module.exports = class dashboards {
  constructor(keys) {
    this.keys = keys;
  }
  async list(cb) {
    var url = urls.api.dashboards.all;
    helper.sendGetKeyRequest(url, this.keys, 'adminKey', cb);
  }
  
  // Get a particular page from the dashboard list
  async getPage(pageId, cb) {
    var url = urls.api.dashboards.all;
    var qs = { 'page': pageId }
    helper.sendGetQSKeyRequest(url, qs, this.keys, 'adminKey', false, cb);
  }
  
  // Get a single dashboard
  async getOne(dashboardId, cb) {
    var url = urls.api.dashboards.one.replace('{dashboard_id}', dashboardId);
    helper.sendGetKeyRequest(url, this.keys, 'adminKey', cb);
  }
  
  async create(dashboardBody, cb) {
    var url = urls.api.dashboards.all;
    helper.sendPutOrPostBody(url, 'POST', dashboardBody, this.keys, 'adminKey', cb);
  }
  
  async update(dashboardId, dashboardBody, cb) {
    var url = urls.api.dashboards.one.replace('{dashboard_id}', dashboardId);
    helper.sendPutOrPostBody(url, 'PUT', dashboardBody, this.keys, 'adminKey', cb);
  }
  
  async delete(dashboardId, cb) {
    var url = urls.api.dashboards.one.replace('{dashboard_id}', dashboardId);
    helper.sendDelete(url, this.keys, 'adminKey', cb);
  }
  
}