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

function getOutputPath(path: string) {
  return path.replace(/dist\/contents/, 'dist').replace(/\.md$/, '/index.html')
}

export function createPage(path: string) {
  const { data, content, excerpt } = matter(path)
  const layout = (data.layout as string) || 'page'
  const destPath = getOutputPath(path)

  async function build(site: Record<string, any>) {
    const props: PageProps = { site, page: data }
    props.content = await gfm(content)
    return props
  }

  function output(content: string) {
    outputPage(destPath, content)
  }

  return {
    destPath,
    layout,
    output,
    build
  }
}

export function outputPage(destPath: string, data: string) {
  outputFileSync(destPath, data)
}
