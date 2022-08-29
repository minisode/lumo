const fs = require('fs-extra')
const site = require('./site')
const post = require('./post')
const page = require('./page')

function postsFilter(path) {
  return post.fromPath(path)
}

function pagesFilter({ slug }) {
  return page.fromPath(`_site/${slug}.html`)
}

function latest({ time }, target) {
  return Date.parse(time) - Date.parse(target.time)
}

class Builder {
  constructor({ paths }) {
    this.site = site.configuration()
    this.posts = paths.map(postsFilter)
    this.pages = this.site.paths.map(pagesFilter)

    for (let post of this.posts) {
      this.site.paths.push({ params: { slug: post.slug } })
    }
  }

  async outputJson() {
    for (let post of this.posts) {
      await fs.outputJson(`_api/${post.slug}.json`, {
        site: this.site,
        type: 'post',
        ...post
      })
    }

    for (let page of this.pages) {
      await fs.outputJson(`_api/${page.slug}.json`, {
        site: this.site,
        type: 'page',
        ...page
      })
    }

    await fs.outputJson('_api/index.json', {
      posts: this.posts.sort(latest).map(({ body, ...post }) => post),
      site: this.site
    })
  }
}

module.exports = Builder
