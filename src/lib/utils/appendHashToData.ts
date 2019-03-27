
import crypto from 'crypto'

export default function dataHashAppend (data, key, secret, options) {
  const allData = { ...data }
  if (!options.hashNoKey) {
    allData.key = key
  }

  if (options.hash === false) {
    return allData
  }

  let hashKeys = typeof options.hashKeys === 'function'
    ? options.hashKeys(data)
    : options.hashKeys
  if (!hashKeys) {
    hashKeys = Object.keys(allData).sort()
  }

  const hash = hashKeys.reduce((res, key) => [
    ...res,
    typeof allData[key] === 'undefined' ? '' : allData[key]
  ], []).join('') + secret

  const signedBody = {
    ...allData,
    hash: crypto.createHash('sha1').update(hash).digest('hex')
  }
  if (options.hashNoKey) {
    signedBody.key = key
  }

  return signedBody
}
