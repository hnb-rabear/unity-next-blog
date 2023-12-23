import { useState, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import Image from 'next/image'

const ArrowIcon = () => {
  return (
    <svg
      className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 10"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M1 5h12m0 0L9 1m4 4L9 9"
      />
    </svg>
  )
}

export default function Card({
  slug,
  title,
  summary,
  tags,
  date,
  path,
  images,
}: {
  slug: string
  title: string
  summary: string
  tags: string[]
  date: string
  path: string
  images: string[]
}) {
  const image = (images && images[0]) || siteMetadata.image
  if (summary.length > 160) summary = summary.slice(0, 160) + '...'
  return (
    <>
      <div className="h-full overflow-hidden rounded-lg border-2 border-gray-300 border-opacity-60 dark:border-gray-700">
        <Link href={`/${path}`}>
          <Image
            className="w-full duration-300 hover:scale-[105%]"
            src={image}
            alt={slug}
            width="200"
            height="300"
            loading="lazy"
          />
        </Link>
        <div className="p-5">
          <time dateTime={date} className="text-sm font-semibold text-gray-700 dark:text-gray-400">
            {formatDate(date, siteMetadata.locale)}
          </time>
          <a href={`/${path}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 hover:underline dark:text-white">
              {title}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{summary}</p>
          <div>
            {tags.map((tag) => (
              <Link
                href={`/tags/${tag}`}
                key={tag}
                className="mb-3 mr-2 inline-block rounded-lg bg-gray-200 px-2 py-1 text-sm text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                #{tag}
              </Link>
            ))}
          </div>

          <a
            href={`/${path}`}
            className="inline-flex items-center rounded-lg bg-primary-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Read more
            <ArrowIcon />
          </a>
        </div>
      </div>
    </>
  )
}
