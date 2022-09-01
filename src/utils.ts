import { pathExistsSync } from 'fs-extra'
import markdown from 'markdown-it'
import shiki from 'shiki'

async function getHighlighter() {
  return await shiki.getHighlighter({
    theme: 'slack-ochin'
  })
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

export function getLayoutPath(theme?: string) {
  return theme && pathExistsSync(`node_modules/${theme}`)
    ? `${theme}/dist/layouts`
    : './blog'
}

// preact-render-to-string
// return a func? layoutPath('home)
