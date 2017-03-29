
export default function onRequest (request) {
  console.log(request)

  request.on('fetchSuccess', () => {
    console.log(request)
  })
}
