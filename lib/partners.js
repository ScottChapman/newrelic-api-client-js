const helper = require('./helper.js');
const urls = require('./api-urls.json');

module.exports = class partners {
  constructor(keys) {
    this.keys = keys;
  }

  async list(page) {
    var url = urls.api.partner.list.replace('{partner_id}', this.keys.partnerId);
    
    // Page 1 is the default
    if (page == null) {
      page = 1;
    }
    
    var qs = {
      'page': page
    }
    return helper.sendGetQSRequest(url, qs, this.keys);
  }
}