/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {prevPage ? (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        ) : (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {nextPage ? (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        ) : (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts
  const isBlogPath = pathname.startsWith('/blog')
  const currentTag = pathname.split('/tags/')[1]

  const renderTags = () => {
    return (
      <div className="px-6 py-4">
        {isBlogPath ? (
          <h3 className="font-bold uppercase text-primary-500">All Posts</h3>
        ) : (
          <Link
            href={`/blog`}
            className="font-bold uppercase text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
          >
            All Posts
          </Link>
        )}
        <ul>
          {sortedTags.map((t) => {
            const isCurrentTag = currentTag === slug(t)
            const tagCount = tagCounts[t]
            return (
              <li key={t} className="my-3">
                {isCurrentTag ? (
                  <h3 className="inline px-3 py-2 text-sm font-bold uppercase text-primary-500">
                    {`${t} (${tagCount})`}
                  </h3>
                ) : (
                  <Link
                    href={`/tags/${slug(t)}`}
                    className="px-3 py-2 text-sm font-medium uppercase text-gray-600 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                    aria-label={`View posts tagged ${t}`}
                  >
                    {`${t} (${tagCount})`}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const renderPosts = () => {
    return (
      <ul>
        {displayPosts.map((post) => {
          const { path, date, title, summary, tags } = post
          const formattedDate = formatDate(date, siteMetadata.locale)
          return (
            <li key={path} className="py-5">
              <article className="flex flex-col space-y-2 duration-300 hover:-translate-y-1 hover:scale-[101%] xl:space-y-0">
                <dl>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-600 dark:text-gray-300">
                    <time dateTime={date}>{formattedDate}</time>
                  </dd>
                </dl>
                <div className="space-y-3">
                  <div>
                    <h2 className="text-2xl font-bold leading-8 tracking-tight">
                      <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                        {title}
                      </Link>
                    </h2>
                    <div className="flex flex-wrap">
                      {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                    </div>
                  </div>
                  <div className="prose max-w-none text-gray-600 dark:text-gray-300">{summary}</div>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <>
      <div>
        <div className="pb-6 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
            {renderTags()}
          </div>
          <div>
            {renderPosts()}
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
