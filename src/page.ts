import matter from 'gray-matter'
import { gfm } from './utils'
import { readFileSync } from 'fs'

function getMatter(path: string) {
  return matter(readFileSync(path, 'utf-8'))
}

export function createPage(path: string) {
  const { data, content, excerpt } = getMatter(path)
  const { layout = 'page' } = data

  async function outputHtml() {
    const html = await gfm(content)
  }

  return {
    layout,
    outputHtml
  }
}

// this.isPost = [] === 'post'
//   async outputJson() {
//     for (let post of this.posts) {
//       await fs.outputJson(`_api/${post.slug}.json`, {
//         site: this.site,
//         type: 'post',
//         ...post
//     for (let page of this.pages) {
//       await fs.outputJson(`_api/${page.slug}.json`, {
//         site: this.site,
//         type: 'page',
//         ...page
// function pagesFilter({ slug }) {
//   return page.fromPath(`_site/${slug}.html`)
// function latest({ time }, target) {
//   return Date.parse(time) - Date.parse(target.time)
