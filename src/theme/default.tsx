import Header from './components/header'
import Footer from './components/footer'

export function Layout({ children }) {
  return (
    <div>
      <Header logo={'site.name'} paths={[]} />
      <main>
        <div class="container mx-auto p-5">{children}</div>
      </main>
      <Footer author={'site.author'} />
    </div>
  )
}
