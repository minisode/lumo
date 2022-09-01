import markdown from 'markdown-it'
import { getHighlighter } from 'shiki'

export async function gfm(source: string) {
  const highlighter = await getHighlighter({
    theme: 'slack-ochin'
  })

  const renderer = markdown({
    html: true,
    highlight: (code, lang) => {
      return highlighter.codeToHtml(code, { lang })
    }
  })

  return renderer.render(source)
}

import { pathExistsSync } from 'fs-extra'

export function getThemeLayout(theme?: string) {
  const layoutPath =
    theme && pathExistsSync(`node_modules/${theme}`)
      ? `${theme}/dist/layouts`
      : './theme'

  return function getLayout(layout: string) {
    return require(`${layoutPath}/${layout}`)
  }
}
