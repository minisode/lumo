import { pathExistsSync } from 'fs-extra'

export type UserConfig = {
  logo?: string
  title?: string
  author?: string
  avatar?: string
  homepage?: string
  description?: string
  theme?: string
  links?: {
    title: string
    url: string
  }[]
}

export function blog(config: UserConfig = {}) {
  config.links ||= []
  return config
}

export function getConfig() {
  const configPath = `${process.cwd()}/lumo.js`
  return pathExistsSync(configPath) ? require(configPath) : blog()
}
