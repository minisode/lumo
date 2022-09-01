import { pathExistsSync } from 'fs-extra'
import markdown from 'markdown-it'
import shiki from 'shiki'

async function getHighlighter() {
  return await shiki.getHighlighter({
    theme: 'slack-ochin'
  })
}

export function getThemeLayout(theme?: string) {
  const layoutPath =
    theme && pathExistsSync(`node_modules/${theme}`)
      ? `${theme}/dist/layouts`
      : './blog'

  return function getLayout(layout: string) {
    return require(`${layoutPath}/${layout}`)
  }
}

export async function gfm(source: string) {
  const highlighter = await getHighlighter()
  const renderer = markdown({
    html: true,
    highlight: (code, lang) => {
      return highlighter.codeToHtml(code, { lang })
    }
  })

  return renderer.render(source)
}
