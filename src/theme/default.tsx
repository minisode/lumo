import { ComponentChildren } from 'preact'
import Header from './components/header'
import Footer from './components/footer'

export default function Layout({
  site,
  children
}: {
  site: Record<string, any>
  children: ComponentChildren
}) {
  return (
    <div>
      <Header logo={site.name} paths={[]} />
      <main>
        <div class="container mx-auto p-5">{children}</div>
      </main>
      <Footer author={site.author} />
    </div>
  )
}
