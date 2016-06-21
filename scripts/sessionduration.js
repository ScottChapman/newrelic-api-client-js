var insights = require('../lib/insights.js');

var nrql = 'SELECT max(timestamp) - min(timestamp) FROM PageView SINCE 1 month ago FACET session LIMIT 100';
insights.query(nrql, function(error, response, body) {
  var facets = body.facets;
  var totalTime = 0;
  for (var i = facets.length - 1; i >= 0; i--) {
    var sessionTime = facets[i].results[0].result;
    totalTime += sessionTime;
  };
  var avgTime = totalTime / facets.length;
  console.log('Total time: ' + totalTime);
  console.log('Session count: ' + facets.length);
  console.log('Average time: ' + avgTime);
});