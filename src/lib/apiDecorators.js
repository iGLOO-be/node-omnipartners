
import pick from 'lodash/pick'

export const apiExtends = ExtendApi => (Target, property, descriptor) => {
  Object.getOwnPropertyNames(ExtendApi.prototype)
    .filter(method => method !== 'constructor')
    .forEach(method => {
      Target.prototype[method] = ExtendApi.prototype[method]
    })

  return Target
}

const setPropertyOnMethod = (fn, property, value) => {
  (fn._originalFn || fn)[property] = value
}

export const doc = url => (target, property, descriptor) => {
  setPropertyOnMethod(target[property], 'documentationUrl', url)
}

export const filterInput = allowKeys => (target, property, descriptor) => {
  const fn = target[property]
  target[property] = (data) => {
    return fn.apply(target, pick(data, allowKeys))
  }
  target[property]._originalFn = fn

  setPropertyOnMethod(target[property], 'filterInput', allowKeys)
}
