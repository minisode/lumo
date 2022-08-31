import glob from 'fast-glob'

function getPaths() {
  return glob.sync('dist/contents/**/*.md')
}

function getUserConfig() {
  return require(`${process.cwd()}/lumo.js`)
}

export class Blog {
  readonly paths: string[]
  readonly posts: string[]

  constructor() {
    this.paths = getPaths()
  }

  async build() {
  }
}

// this.site = site.configuration()
// this.pages = this.site
// for (let post of this.posts) {
//   this.site.paths.push({ params: { slug: post.slug } })
// }
// export function blog(config: UserConfig) {
// await trash('_api/**/*.json')
