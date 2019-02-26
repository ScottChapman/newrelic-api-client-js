const request = require('request-promise-native');
const _ = require('lodash');
const assert = require('assert');

var helper = {};

/*
// Generic helper to process request() callback
helper.handleCB = function (error, response, body) {
  if (!error && response.statusCode === 200) {
    return body;
  } else {
    // console.error('API Error!');
    if (error) {
      throw(error);
    } else {
      console.error('Bad status code: ', response.statusCode);
      if (response.statusCode != 500) {
        console.error('Error msg: ', body);
      }
    }
  }
  return null;
}
*/

// Helper to check if multiple pages of data should be returned
// - One type of format is URI?page=#
// - For metric data the format is URI?cursor=#
helper.linkCheck = function (link) {
  if (link == null) {
    return null;
  }

  // There can be parameters for first, prev, next, and last
  // Note: if last ends with 0, then we need to return null
  var lastUri = null;
  var nextUri = null;

  // Split the link value
  var paramList = link.split(',');
  for (var i=0; i < paramList.length; i++) {
    
    // Split the parameter
    var param = paramList[i].split(';');

    // Look for next and last
    if (param[1].indexOf('last') > 0) {
      lastUri = param[0].replace('<', '').replace('>', '').trim();
    } else if (param[1].indexOf('next') > 0) {
      nextUri = param[0].replace('<', '').replace('>', '').trim();
    }
  }
  
  // If last points to "cursor=" (blank cursor) we should return null
  if (nextUri != null) {
    if (nextUri.indexOf('cursor=', nextUri.length - 'cursor='.length) !== -1) {
      return null;
    }
  }

  // If last points to page=0 then we should return null
  if (lastUri != null) {
    if (lastUri.indexOf('page=0', lastUri.length - 6) !== -1) {
      return null;
    }
  }
  return nextUri;
}

function customizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

// If the link does not have a cursor, merge the page number into the query string
helper.addPageToQS = function(qs, linkUri) {
  if (qs == null) {
    qs = {};
  }
  
  // Grab the part that says 'page=#' from the end of the URI
  var linkPage = linkUri.substring(linkUri.indexOf('page='));
  
  // This will just grab the part after the = sign
  qs.page = linkPage.substring(linkPage.indexOf('=')+1);
  return qs;
}

// uri - https uri
// qs - query string
// configId - which account to use from config json
// keyType - either restKey or adminKey
// getAllPages - whether or not to get all pages of data
// cb - callback
// pagesData - storage for multiple pages (optional)
helper.sendGetQSKeyRequest = async function (uri, qs, keys, keyType, getAllPages, pagesData) {
  
  // This gets either the restKey or adminKey
  var localKey = keys[keyType]

  // Setup all the options
  var options = {
    'method': 'GET',
    'uri': uri,
    'headers': {'X-Api-Key': localKey},
    'qs': qs,
    resolveWithFullResponse: true,
    'json': true
  };

  // Call the API, check for pagination
  var response = await request(options);
  var body = response.body;
  if (getAllPages) {
    if (pagesData == null) {
      pagesData = body;
    } else {
      _.mergeWith(pagesData, body, customizer);
    }
      
      // Check if there are more pages of data
      var nextUri = helper.linkCheck(response.headers.link);
      if (nextUri != null) {
        return helper.sendGetQSKeyRequest(nextUri, qs, keys, keyType, getAllPages, pagesData);
      } else {
        // Send back the combined data from all pages
        return (pagesData);
      }
    } else {
      // Send back the data just for this page
      return (body);
    }
}

// Call endpoint with query string (assumes restKey and getAllPages=true)
helper.sendGetQSRequest = async function (uri, qs, keys) {
  return helper.sendGetQSKeyRequest(uri, qs, keys, 'restKey', true);
}

// Simple version to use with null query string (assumes restKey and getAllPages=true)
helper.sendGetRequest = async function (uri, keys) {
  return helper.sendGetQSKeyRequest(uri, null, keys, 'restKey', true);
}

// Simple version to use with null query string (assumes getAllPages=true)
helper.sendGetKeyRequest = async function (uri, keys, keyType) {
  return helper.sendGetQSKeyRequest(uri, null, keys, keyType, true);
}

// Send the PUT or POST with a query string
helper.sendPutOrPostQS = async function(uri, method, qs, keys, keyType) {
  // This gets either the restKey or adminKey
  var localKey = keys[keyType]

  // Setup all the options
  var options = {
    'method': method,
    'uri': uri,
    'headers': {'X-Api-Key': localKey},
    'json': true,
    'qs': qs
  };

  return request(options);
}

// Send the PUT or POST with a JSON body
helper.sendPutOrPostBody = async function(uri, method, body, keys, keyType) {
  // This gets either the restKey or adminKey
  var localKey = keys[keyType]

  // Setup all the options
  var options = {
    'method': method,
    'uri': uri,
    'headers': {'X-Api-Key': localKey},
    'json': true,
    resolveWithFullResponse: true,
    'body': body
  };

  var resp = await request(options);
  return resp.body;
}

// Send a DELETE (no query string, no body)
helper.sendDelete = function(uri, keys, keyType) {
  // This gets either the restKey or adminKey
  var localKey = keys[keytype]

  // Setup all the options
  var options = {
    'method': 'DELETE',
    'uri': uri,
    'headers': {'X-Api-Key': localKey},
    'json': true
  };

  return request(options);
}

/*
// Find the configId for this accountId
helper.getConfigId = function(accountId) {
  var configArr = config.get('configArr');
  for (var i = 0; i < configArr.length; i++) {
    var configId = configArr[i];
    var cfgAccountId = config.get(configId + '.accountId');
    if (cfgAccountId == accountId) {
      return configId;
    }
  }

  // If we get this far it wasn't found
  return null;
}
  */

module.exports = helper;
