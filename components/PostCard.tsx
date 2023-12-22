import { useState, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import Image from 'next/image'

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
  return (
    <>
      <div className="h-[600px] rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
        <Link href={`/${path}`}>
          <Image
            className="w-full rounded-t-lg"
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
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{summary}</p>
          <div>
            {tags.map((tag) => (
              <span
                key={tag}
                className="light:bg-blue-100 light:text-blue-700 mb-3 mr-2 inline-block rounded-lg px-2 py-1 text-sm dark:bg-gray-700"
              >
                #{tag}
              </span>
            ))}
          </div>
          <a
            href={`/${path}`}
            className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
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
          </a>
        </div>
      </div>
    </>
  )
}
