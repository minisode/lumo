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

// function latest({ time }, target) {
//   return Date.parse(time) - Date.parse(target.time)
