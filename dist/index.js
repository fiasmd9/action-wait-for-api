/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 151:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const fetch = __nccwpck_require__(113);
const { getDotted } = __nccwpck_require__(838);
const { log } = __nccwpck_require__(611);

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


/***/ }),

/***/ 838:
/***/ ((module) => {

function getDotted(obj, propertyName) {
  let parts = propertyName.split('.');

  let value = obj;

  for (let part of parts) {
    try {
      value = value[part];
    } catch (error) {
      return undefined;
    }
  }

  return value;
}

module.exports = { getDotted };


/***/ }),

/***/ 611:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const core = __nccwpck_require__(302);

function log(message) {
  if (process.env.TESTING) {
    return;
  }

  core.debug(message);
}

module.exports = { log };


/***/ }),

/***/ 236:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { doFetch } = __nccwpck_require__(151);
const { log } = __nccwpck_require__(611);

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


/***/ }),

/***/ 302:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 113:
/***/ ((module) => {

module.exports = eval("require")("node-fetch");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(302);
const { tryFetch } = __nccwpck_require__(236);

(async function () {
  try {
    let method = core.getInput('method');
    let url = core.getInput('url');
    let headersString = core.getInput('headers');
    let timeout = parseInt(core.getInput('timeout'));
    let interval = parseInt(core.getInput('interval'));
    

    core.debug(`=== Waiting for API response to continue. ===`);
    core.debug(`URL: ${url}`);
    core.debug(`Method: ${method}`);
    core.debug(`Headers: ${headersString}`);
    core.debug('# Waiting for this response:');
    

   

    core.debug('');
    core.debug('');

    let headers = headersString ? JSON.parse(headersString) : {};
    let start = +new Date();

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

})();

module.exports = __webpack_exports__;
/******/ })()
;