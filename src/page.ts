import { readFileSync } from 'fs'
import { gfm } from './utils'
import matter from 'gray-matter'

export type PageProps = {
  site: Record<string, any>
  page: Record<string, any>
  content?: string
}

function getMatter(path: string) {
  return matter(readFileSync(path, 'utf-8'))
}

export function createPage(path: string) {
  const { data, content, excerpt } = getMatter(path)
  const { layout = 'page' } = data
  const output = path.replace(/\.md$/, '/index.html')

  async function buildContext(site: Record<string, any>) {
    const props: PageProps = { site, page: data }
    console.log(content)
    props.content = await gfm('content')
    return props
  }

  return {
    layout,
    output,
    buildContext,
  }
}

// export function outputHtml(layout: unknown, aaaa: aaaaa) {
// // // function latest({ time }, target) {
// // //   return Date.parse(time) - Date.parse(target.time)
// // excerpt,
// // data,
