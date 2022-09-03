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
      const content = this.renderToString(page.layout, data)

      if (page.layout === 'post') {
        const slug = page.dest.replace(/\/index.html$/, '')
        this.posts.push({ ...data.page, url: `/${slug}` })
      }

      page.output({ ...data, content })
    }

    this.buildPosts()
  }

  private async buildPosts() {
    const groups = paginate(this.posts, 3)
    const entries = Object.entries(groups)

    for (const [num, posts] of entries) {
      const dest = `${~~num + 1}/index.html`.replace(/^1\//, '')
      const content = this.renderToString('home', {
        site: { posts },
        page: {}
      })

      const props = { site: {}, page: {}, content }
      outputPage(dest, props)
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
