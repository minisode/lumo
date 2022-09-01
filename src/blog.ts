import type { UserConfig } from './index'
import { getImportLayout } from './utils'
import { createPage } from './page'
import glob from 'fast-glob'

function getPaths() {
  return glob.sync('dist/contents/**/*.md')
}

export class Blog {
  readonly layouts: Map<string, unknown>
  readonly paths: string[]
  readonly posts: any[]

  constructor(config: UserConfig) {
    this.paths = getPaths()
    const importLayout = getImportLayout(config.theme)
    this.layouts.set('home', importLayout('home'))
    this.layouts.set('page', importLayout('page'))
    this.layouts.set('post', importLayout('post'))
  }

  async build() {
    for (const path of this.paths) {
      const page = createPage(path)
      await page.outputHtml()

      if (page.layout === 'post') {
        this.posts.push(page)
      }
    }
  }
}

// // Content title? layout?(post) date? draft:false!
// //   filter draft invalid_date
//   components: {
