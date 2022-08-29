const { load } = require('cheerio')
const { basename } = require('path')
const { readFileSync } = require('fs')

function getContent(path) {
  return readFileSync(path, 'utf-8')
}

function slugify(string) {
  return string.replace(/\.[^\.]+$/, '')
}

function fromPath(path) {
  const $ = load(getContent(path))
  const slug = slugify(basename(path))
  const body = $('.post-content').html()

  return { $, slug, body }
}

module.exports = { fromPath }
