const nodeFetch = require("node-fetch");

global.fetch = nodeFetch.default || nodeFetch;
global.Headers = nodeFetch.Headers;
global.Request = nodeFetch.Request;
global.Response = nodeFetch.Response;
