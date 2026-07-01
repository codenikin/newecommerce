import { getPayload } from 'payload'
import config from '@/payload.config'
import { PageClient } from './pageclient'
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const HomePageData = await payload.findGlobal({
    slug: 'homepage',
    depth: 2,
  })
  const blocks = HomePageData?.layout || []
  const schema = HomePageData?.schema?.schemaMarkup || null
  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      )}
      <PageClient Layout={blocks} />
    </>
  )
}
