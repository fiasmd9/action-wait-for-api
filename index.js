const core = require('@actions/core');
const { tryFetch } = require('./lib/try-fetch');

(async function () {
  try {
    let method = core.getInput('method');
    let url = core.getInput('url');
    let headersString = core.getInput('headers');
    let timeout = parseInt(core.getInput('timeout'));
    let interval = parseInt(core.getInput('interval'));
    

    core.error(`=== Waiting for API response to continue. ===`);
    core.debug(`URL: ${url}`);
    core.debug(`Method: ${method}`);
    core.debug(`Headers: ${headersString}`);
    core.debug('# Waiting for this response:');
    

   

    core.debug('');
    core.debug('');

    let headers = headersString ? JSON.parse(headersString) : {};
    let start = +new Date();
    core.setFailed("Cancelled");
    await tryFetch({
      start,
      interval,
      timeout,
      url,
      method,
      headers
    });

    core.debug('API request was successfull.');
  } catch (error) {
    core.setFailed(error.message);
  }
})();
