/* eslint-env mocha */

import Identity from '..'

export const baseConfig = {
  host: 'http://cis.staging.rcbe.omnipartners.be',
  key: 'b59b129e7c4dbe53ede4874535b5c784667936ce',
  secret: '3788ac15ba321a8b9913b5130ef2f4aa0e822fd0'
  // onRequest: consoleLogger
}

export class BaseIdentityTest {
  Api = Identity
  apiConfig = baseConfig
}
