const fetch = require('node-fetch');
const { getDotted } = require('./get-dotted');
const { log } = require('./log');

async function doFetch({
  url,
  method,
  headers
}) {
  log(`Try API request...`);
  let response = await fetch(url, { method, headers });

  if (response.status !== "200" || response.status !== "500" || response.status !== "504") {
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
