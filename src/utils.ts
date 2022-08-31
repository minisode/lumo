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

// preact-render-to-string
