const trash = require('trash')
const command = require('../command')

async function handler() {
  await trash('_api/**/*.json')
}

module.exports = command('clean', { handler })
