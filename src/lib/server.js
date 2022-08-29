const { createServer } = require('http')
const serveHandler = require('serve-handler')

const server = createServer((request, response) => {
  return serveHandler(request, response, {
    public: '_api'
  })
})

function start({ port }) {
  return server.listen(port, () => {
    console.log(`* Listening on http://localhost:${port}`)
    console.log('* Use Ctrl-C to stop')
  })
}

module.exports = { start }
