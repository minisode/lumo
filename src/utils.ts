import renderToString from 'preact-render-to-string'
import { pathExistsSync } from 'fs-extra'
import { getHighlighter } from 'shiki'
import markdown from 'markdown-it'

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

export function render(target: any, props: Record<string, any>) {
  return renderToString(target.default(props))
}

export function useTheme(theme?: string) {
  const layoutPath =
    theme && pathExistsSync(`node_modules/${theme}`)
      ? `${theme}/dist/layouts`
      : './theme'

  return function useLayout(layout: string) {
    return require(`${layoutPath}/${layout}`)
  }
}
