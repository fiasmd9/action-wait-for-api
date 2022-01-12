const { ConnectionError } = require('mockttp/dist/client/mockttp-client');
const fetch = require('node-fetch');
const { getDotted } = require('./get-dotted');
const { log } = require('./log');
const core = require('@actions/core');

async function doFetch({
  url,
  method,
  headers
}) {

  log(`Try API request...`);

  let response = await fetch(url, { method, headers });
  core.error("Status Code : "+response.status);
  if (response.status !== "200" && response.status !== "500" && response.status !== "504") {
    throw new Error(
      `Wrong status ${response.status}, expected ${expectedStatus}`
    );
  }

  if (response.status == "500") {
    throw new Error("500"
    );
  }

  if (response.status == "504") {
    throw new Error("504"
    );
  }

  
  if (response.status == "200") {
  return true;
  }
}

module.exports = { doFetch };
