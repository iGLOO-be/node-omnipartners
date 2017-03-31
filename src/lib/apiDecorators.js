
export const apiExtends = ExtendApi => (Target, property, descriptor) => {
  return function (config) {
    const extendApi = new ExtendApi(config)
    const target = new Target(config)

    Object.getOwnPropertyNames(ExtendApi.prototype)
      .filter(method => method !== 'constructor')
      .forEach(method => {
        target[method] = extendApi[method].bind(extendApi)
      })

    return target
  }
}

export const doc = url => (target, property, descriptor) => {
  target[property].documentationUrl = url
}
