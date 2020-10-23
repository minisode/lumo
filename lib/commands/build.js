const fs = require('fs-extra')
const glob = require('tiny-glob')
const Builder = require('../builder')
const command = require('../command')

async function getPaths() {
  return (await glob('_site/**/*.html'))
    .filter(path => /\d{4}\/\d{2}\/\d{2}/.test(path))
}

async function handler() {
  await fs.ensureDir('_site')
  const paths = await getPaths()
  const builder = new Builder({ paths })
  await builder.outputJson()
}

module.exports = command('build', { handler })
