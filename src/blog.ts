import type { UserConfig } from './index'
import type { PageProps } from './page'
import { getThemeLayout } from './utils'
import { createPage } from './page'
import groupBy from 'lodash/groupBy'
import glob from 'fast-glob'

type Post = {
  title: string
  date: string
  url: string
}

function getPaths() {
  return glob.sync('dist/contents/**/*.md')
}

export class Blog {
  readonly layouts: Map<string, unknown> = new Map()
  readonly config: UserConfig
  readonly paths: string[]
  readonly posts: unknown[] = []

  constructor(config: UserConfig) {
    this.setLayouts(config.theme)
    this.paths = getPaths()
    this.config = config
  }

  async build() {
    for (const path of this.paths) {
      const page = createPage(path)
      const props = await page.buildContext(this.config)

      if (page.layout === 'post') {
        this.posts.push({})
      }
    }

    this.buildPosts()
  }

  private async buildPosts() {
    console.log(Object.values(groupBy(this.posts.map((_, n) => n), (n) => ~~(n / 3))))
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
