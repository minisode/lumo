const nanoid = require('./nanoid')
const page = require('./page')

function fromPath(path) {
  const key = nanoid.generate()
  const { $, ...data } = page.fromPath(path)
  const title = $('header .post-title').text()
  const time = $('header .post-meta time').attr('datetime')

  return { ...data, key, title, time }
}

module.exports = { fromPath }
