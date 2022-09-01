import matter from 'gray-matter'
import { gfm } from './utils'
import { readFileSync } from 'fs'

export type PageProps = {
  site: Record<string, any>
  page: Record<string, any>
  content: string
}

function getMatter(path: string) {
  return matter(readFileSync(path, 'utf-8'))
}

export function createPage(path?: string) {
  const { data, content, excerpt } = getMatter(path)
  const { layout = 'page' } = data

  async function outputHtml() {
    const html = await gfm(content)
  }

  return {
    outputHtml,
    excerpt,
    layout,
    data,
  }
}

// function latest({ time }, target) {
//   return Date.parse(time) - Date.parse(target.time)
