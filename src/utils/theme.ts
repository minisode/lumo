import { pathExistsSync } from 'fs-extra'

export function getThemeLayout(theme?: string) {
  const layoutPath =
    theme && pathExistsSync(`node_modules/${theme}`)
      ? `${theme}/dist/layouts`
      : './blog'

  return function getLayout(layout: string) {
    return require(`${layoutPath}/${layout}`)
  }
}
