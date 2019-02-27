const helper = require('./helper.js');
const urls = require('./api-urls.json');

// Define the initial API
module.exports = class dashboards {
  constructor(keys) {
    this.keys = keys;
  }
  async list() {
    var url = urls.api.dashboards.all;
    const resp = await helper.sendGetKeyRequest(url, this.keys, 'adminKey');
    return resp.dashboards;
  }
  
  // Get a particular page from the dashboard list
  async getPage(pageId) {
    var url = urls.api.dashboards.all;
    var qs = { 'page': pageId }
    return helper.sendGetQSKeyRequest(url, qs, this.keys, 'adminKey', false);
  }
  
  // Get a single dashboard
  async getDashboard(dashboardId) {
    var url = urls.api.dashboards.one.replace('{dashboard_id}', dashboardId);
    const resp = await helper.sendGetKeyRequest(url, this.keys, 'adminKey');
    return resp.dashboard;
  }
  
  async create(dashboardBody) {
    var url = urls.api.dashboards.all;
    const resp = await helper.sendPutOrPostBody(url, 'POST', dashboardBody, this.keys, 'adminKey');
    return resp.dashboard;
  }
  
  async update(dashboardBody) {
    var url = urls.api.dashboards.one.replace('{dashboard_id}', dashboardBody.id);
    delete dashboardBody.id;
    const resp = await helper.sendPutOrPostBody(url, 'PUT', dashboardBody, this.keys, 'adminKey');
    return resp.dashboard
  }
  
  async delete(dashboardId) {
    var url = urls.api.dashboards.one.replace('{dashboard_id}', dashboardId);
    return helper.sendDelete(url, this.keys, 'adminKey');
  }
}