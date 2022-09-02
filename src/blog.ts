import render from 'preact-render-to-string'
import { createPage, outputPage } from './page'
import type { UserConfig } from './index'
import type { PageProps } from './page'
import { useTheme } from './utils'
import groupBy from 'lodash/groupBy'
import range from 'lodash/range'
import glob from 'fast-glob'

type Post = {
  title?: string
  date?: string
  url?: string
}

function getPaths() {
  return glob.sync('dist/contents/**/*.md')
}

function paginate(items: any[], perPage: number = 10) {
  const groups = groupBy(range(items.length), (num) => ~~(num / perPage))
  return Object.values(groups).map((num) => num.map((index) => items[index]))
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
      const html = this.renderToString(page.layout, data)

      if (page.layout === 'post') {
        this.posts.push(data.page)
      }
    }

    this.buildPosts()
  }

  private async buildPosts() {
    for (const posts of paginate(this.posts, 3)) {
      const html = this.renderToString('home', {
        site: { posts },
        page: {}
      })
    }
  }

  private renderToString(layout: string, props: PageProps) {
    const _layout = this.layouts.get(layout) as any
    return render(_layout.default(props))
  }

  private setLayouts(theme?: string) {
    const useLayout = useTheme(theme)
    this.layouts.set('home', useLayout('home'))
    this.layouts.set('page', useLayout('page'))
    this.layouts.set('post', useLayout('post'))
  }
}
