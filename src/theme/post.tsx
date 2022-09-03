import PostHead from './components/post-head'
import Layout from './default'

export default function PostLayout({
  site,
  page,
  content
}: {
  site: Record<string, any>
  page: Record<string, any>
  content: string
}) {
  const { author, title, time } = page
  return (
    <Layout site={site}>
      <PostHead {...{ author, title, time }} />
      <div
        class="markdown-body"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Layout>
  )
}
