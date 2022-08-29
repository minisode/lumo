const fs = require('fs-extra')

function pathsFilter({ title, slug }, key) {
  return { key, title, slug, params: { slug } }
}

function configuration() {
  const site = fs.readJsonSync('./lumo.json')
  const paths = (site.paths || []).map(pathsFilter)

  return {
    name: '',
    logo: '',
    title: '',
    author: '',
    homepage: '',
    ...site,
    paths
  }
}

module.exports = { configuration }
