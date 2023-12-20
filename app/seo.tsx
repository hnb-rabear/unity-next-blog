import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export function genPageMetadata({ title, description, image, ...rest }: PageSEOProps): Metadata {
  const openGraphTitle = `${title} | ${siteMetadata.title}`
  const openGraphDescription = description || siteMetadata.description
  const openGraphImages = image ? [image] : [siteMetadata.socialBanner]
  const twitterTitle = `${title} | ${siteMetadata.title}`
  const twitterImages = image ? [image] : [siteMetadata.socialBanner]

  return {
    title,
    openGraph: {
      title: openGraphTitle,
      description: openGraphDescription,
      url: './',
      siteName: siteMetadata.title,
      images: openGraphImages,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: twitterTitle,
      card: 'summary_large_image',
      images: twitterImages,
    },
    ...rest,
  }
}
