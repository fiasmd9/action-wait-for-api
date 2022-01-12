const { doFetch } = require('./do-fetch');
const { log } = require('./log');

async function tryFetch({
  start = +new Date(),
  interval,
  timeout,
  url,
  method,
  headers
}) {
  try {
    await doFetch({
      url,
      method,
      headers
    });
  } catch (error) {
    log(`API request failed with ${error}`);
    if (error.message == "500") {
      throw new Error(`Rejected`);
    }

    if (error.message == "504") {
      throw new Error(`Cancelled`);
    }
    // Wait and then continue
    await new Promise((resolve) => setTimeout(resolve, interval * 1000));

    if (+new Date() - start > timeout * 1000) {
      throw new Error(`Timeout after ${timeout} seconds.`);
    }

    await tryFetch({
      start,
      interval,
      timeout,
      url,
      method,
      headers
    });
  }
}

module.exports = { tryFetch };
