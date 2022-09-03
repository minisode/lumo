import Layout from './default'

export default function PageLayout({
  site,
  content
}: {
  site: Record<string, any>
  content: string
}) {
  return (
    <Layout site={site}>
      <div
        class="markdown-body"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Layout>
  )
}
