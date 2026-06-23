import type { Metadata } from 'next'
import type { Media, Config, Product } from '../payload-types'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()
  let url = serverUrl + '/website-template-OG.webp'
  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.url || ''
    if (ogUrl) {
      url = new URL(ogUrl, serverUrl).toString()
    }
  }
  return url
}
export const generateMeta = async (args: {
  title?: string
  description?: string
  doc: Partial<Media> | Partial<Product> | null
}): Promise<Metadata> => {
  const { doc, title, description } = args
  const serverUrl = getServerSideURL()
  const slug = doc?.id ? (Array.isArray(doc.id) ? doc.id.join('/') : String(doc.id)) : ''
  const canonicalUrl = slug ? `${serverUrl}/${slug}` : serverUrl

  return {
    alternates: {
      canonical: canonicalUrl,
    },
    metadataBase: new URL(serverUrl),
    openGraph: mergeOpenGraph({
      url: canonicalUrl,
    }),
    twitter: {
      card: 'summary_large_image',
    },
  }
}
