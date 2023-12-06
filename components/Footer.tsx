import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import IconView from '@/components/icons'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <IconView kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <IconView kind="github" href={siteMetadata.github} size={6} />
          <IconView kind="facebook" href={siteMetadata.facebook} size={6} />
          <IconView kind="youtube" href={siteMetadata.youtube} size={6} />
          <IconView kind="linkedin" href={siteMetadata.linkedin} size={6} />
          <IconView kind="twitter" href={siteMetadata.twitter} size={6} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-600 dark:text-gray-300">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
        <div className="mb-8 text-sm text-gray-600 dark:text-gray-300">
          <Link href="https://github.com/timlrx/tailwind-nextjs-starter-blog">
            Tailwind Nextjs Theme
          </Link>
        </div>
      </div>
    </footer>
  )
}
