
import crypto from 'crypto'

export default function dataHashAppend (data, key, secret, options) {
  const allData = { ...data }
  if (!options.hashNoKey) {
    allData.key = key
  }

  const sortedKeys = Object.keys(allData).sort()

  const hash = sortedKeys.reduce((res, key) => [
    ...res,
    allData[key]
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
