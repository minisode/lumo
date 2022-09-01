import type { UserConfig } from './index'
import { createPage } from './page'
import { useTheme } from './utils'
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
    }

    this.buildPosts()
  }

  private async buildPosts() {}

  private setLayouts(theme?: string) {
    const getLayout = useTheme(theme)
    this.layouts.set('home', getLayout('home'))
    this.layouts.set('page', getLayout('page'))
    this.layouts.set('post', getLayout('post'))
  }
}
