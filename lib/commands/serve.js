const server = require('../server')
const command = require('../command')

function builder(yargs) {
  return yargs
    .alias({ port: 'p' })
    .default({ port: 4567 })
}

function handler({ port }) {
  server.start({ port })
}

module.exports = command('serve', { builder, handler })
