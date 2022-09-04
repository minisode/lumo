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

function renderPage({ site, page, content }: PageProps) {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="https://unpkg.com/@primer/css@20.4.4/dist/markdown.css" />
      <link rel="stylesheet" href="/assets/index.css" />
      <title>${page.title || site.title}</title>
    </head>
    <body>
      <div id="app">${content}</div>
      <script src="/dist/blog.js"></script>
    </body>
  </html>`
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

  function output(props: PageProps) {
    outputPage(dest, props)
  }

  return {
    layout,
    output,
    build,
    dest
  }
}

export function outputPage(dest: string, props: PageProps) {
  outputFileSync(`dist/${dest}`, renderPage(props))
}
