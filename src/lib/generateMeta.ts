import type { Metadata } from 'next'
import type {
  Media,
  HeroSection,
  AboutPage,
  Config,
  Contact,
  PayloadScreen,
  SeoPage,
  HomePage,
  Service,
  Product,
} from '../payload-types'
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
  doc:
    | Partial<HeroSection>
    | Partial<AboutPage>
    | Partial<Contact>
    | Partial<PayloadScreen>
    | Partial<SeoPage>
    | Partial<HomePage>
    | Partial<Service>
    | Partial<Product>
    | null
}): Promise<Metadata> => {
  const { doc, title, description } = args
  const serverUrl = getServerSideURL()
  const slug = doc?.slug ? (Array.isArray(doc.slug) ? doc.slug.join('/') : String(doc.slug)) : ''
  const canonicalUrl = slug ? `${serverUrl}/${slug}` : serverUrl
  const ogImage = getImageURL(doc?.meta?.image)
  const metaTitle = title || doc?.meta?.title || 'Codenik Design'
  const metaDescription = description || doc?.meta?.description
  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    metadataBase: new URL(serverUrl),
    openGraph: mergeOpenGraph({
      description: metaDescription || doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title: metaTitle,
      url: canonicalUrl,
    }),
    twitter: {
      card: 'summary_large_image',
      description: metaDescription || doc?.meta?.description || '',
      images: [ogImage],
      title: metaTitle,
    },
  }
}
