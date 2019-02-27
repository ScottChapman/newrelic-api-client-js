const request = require('request-promise-native');
const config = require('config');

module.exports = class insights {
  constructor(keys) {
    this.keys = keys;
  }

  async query(nrql) {
    
    // Look up config items
  
    // URI changes for every account
    var uri = 'https://insights-api.newrelic.com/v1/accounts/' +
      accountId + '/query';
  
    var options = {
      'method': 'GET',
      'uri': uri,
      'headers': {'X-Query-Key': this.keys.insightsQueryKey},
      'json': true,
      'qs': {
        'nrql': nrql
      }
    };
  
    // Call the API
    request(options);
  }
  
  async publish(eventArr) {
    
    // Look up config items
  
    // URI changes for every account
    var uri = 'https://insights-collector.newrelic.com/v1/accounts/' +
      accountId + '/events';
  
    var options = {
      'method': 'POST',
      'uri': uri,
      'headers': {'X-Insert-Key': this.keys.insightsInsertKey},
      'json': true,
      'body': eventArr
    }
  
    // Call the API
    return request(options);
  }
}
