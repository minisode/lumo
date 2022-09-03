import { outputFileSync } from 'fs-extra'
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

function destPath(path: string) {
  return path.replace(/dist\/contents\//, '').replace(/\.md$/, '/index.html')
}

export function createPage(path: string) {
  const { data, content, excerpt } = matter(path)
  const layout = (data.layout as string) || 'page'
  const dest = destPath(path)

  async function build(site: Record<string, any>) {
    const props: PageProps = { site, page: data }
    props.content = await gfm(content)
    return props
  }

  function output(content: string) {
    outputPage(dest, content)
  }

  return {
    layout,
    output,
    build,
    dest
  }
}

export function outputPage(dest: string, data: string) {
  outputFileSync(`dist/${dest}`, data)
}
