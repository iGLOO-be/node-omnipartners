
import { EventEmitter } from 'events'
import querystring from 'querystring'
import fetch from 'isomorphic-fetch'
import Response from './Response'

export default class Request extends EventEmitter {
  constructor ({
    method,
    uri,
    body,
    qs,
    headers
  }) {
    super()

    this.method = method
    this.uri = uri
    this.body = body
    this.qs = qs
    this.headers = headers
    this.meta = {
      start: new Date(),
      finish: null
    }
  }

  async fetch () {
    this.emit('fetch')

    let uri = this.uri
    if (this.qs) {
      uri += '?' + querystring.stringify(this.qs)
    }

    const fetchRes = await fetch(uri, {
      method: this.method,
      body: this.body,
      headers: this.headers
    })

    this.meta.finish = new Date()
    this.response = new Response(this, fetchRes)
    this.response.checkRequestStatus()

    this.emit('fetchSuccess')
  }

  toJSON () {
    return {
      ...this,
      response: this.response.toJSON()
    }
  }
}
