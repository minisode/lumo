import { readFileSync } from 'fs'
import { gfm } from './utils'
import gm from 'gray-matter'

export type PageProps = {
  site: Record<string, any>
  page: Record<string, any>
  content?: string
}

function matter(path: string) {
  return gm(readFileSync(path, 'utf-8'))
}

function getOutputPath(path: string) {
  return path.replace(/dist\/contents/, 'dist').replace(/\.md$/, '/index.html')
}

export function createPage(path: string) {
  const { data, content, excerpt } = matter(path)
  const layout = (data.layout as string) || 'page'
  const outputPath = getOutputPath(path)

  async function build(site: Record<string, any>) {
    const props: PageProps = { site, page: data }
    props.content = await gfm(content)
    return props
  }

  return {
    outputPath,
    layout,
    build
  }
}

// function latest({ time }, target) {
//   return Date.parse(time) - Date.parse(target.time)
// import groupBy from 'lodash/groupBy'
// console.log(Object.values(groupBy(this.posts.map((_, n) => n), (n) => ~~(n / 3))))
// Content title? layout?(post) date? draft:false!
//   filter draft invalid_date
