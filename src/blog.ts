import type { UserConfig } from './index'
import type { PageProps } from './page'
import { getThemeLayout } from './utils'
import { createPage } from './page'
import glob from 'fast-glob'

function getPaths() {
  return glob.sync('dist/contents/**/*.md')
}

export class Blog {
  readonly layouts: Map<string, unknown> = new Map()
  readonly config: UserConfig
  readonly posts: PageProps[]
  readonly paths: string[]

  constructor(config: UserConfig) {
    this.setLayouts(config.theme)
    this.paths = getPaths()
    this.config = config
  }

  async build() {
    for (const path of this.paths) {
      const page = createPage(path)
      await page.outputHtml()

      if (page.layout === 'post') {
        this.posts.push({
          site: this.config,
          page: {},
          content: ''
        })
      }
    }
  }

  private async buildPosts() {
  }

  private setLayouts(theme?: string) {
    const getLayout = getThemeLayout(theme)
    this.layouts.set('home', getLayout('home'))
    this.layouts.set('page', getLayout('page'))
    this.layouts.set('post', getLayout('post'))
  }
}

// // Content title? layout?(post) date? draft:false!
// //   filter draft invalid_date
//   components: {
