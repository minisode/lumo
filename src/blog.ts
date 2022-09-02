import type { UserConfig } from './index'
import type { PageProps } from './page'
import { createPage } from './page'
import { useTheme, render } from './utils'
import glob from 'fast-glob'

type Post = {
  title?: string
  date?: string
  url?: string
}

function getPaths() {
  return glob.sync('dist/contents/**/*.md')
}

export class Blog {
  readonly layouts: Map<string, unknown> = new Map()
  readonly config: UserConfig
  readonly posts: Post[] = []
  readonly paths: string[]

  constructor(config: UserConfig) {
    this.setLayouts(config.theme)
    this.paths = getPaths()
    this.config = config
  }

  async build() {
    for (const path of this.paths) {
      const page = createPage(path)
      const data = await page.build(this.config)
      if (page.layout === 'post') {
        this.posts.push(data.page)
      }

      console.log(this.renderToString(page.layout, data))
    }

    this.buildPosts()
  }

  private async buildPosts() {}

  private renderToString(layout: string, props: PageProps) {
    return render(this.layouts.get(layout) as any, props)
  }

  private setLayouts(theme?: string) {
    const useLayout = useTheme(theme)
    this.layouts.set('home', useLayout('home'))
    this.layouts.set('page', useLayout('page'))
    this.layouts.set('post', useLayout('post'))
  }
}
