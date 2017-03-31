
import pick from 'lodash/pick'

export const apiExtends = ExtendApi => (Target, property, descriptor) => {
  function Klass (config) {
    const extendApi = new ExtendApi(config)
    const target = new Target(config)

    Object.getOwnPropertyNames(ExtendApi.prototype)
      .filter(method => method !== 'constructor')
      .forEach(method => {
        target[method] = extendApi[method].bind(extendApi)
      })

    return target
  }

  Klass.prototype = Target.prototype

  return Klass
}

export const doc = url => (target, property, descriptor) => {
  target[property].documentationUrl = url
}

export const filterInput = allowKeys => (target, property, descriptor) => {
  const fn = target[property]
  target[property] = (data) => {
    return fn.apply(target, pick(data, allowKeys))
  }
}
