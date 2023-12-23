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
import PostCard from '@/components/PostCard'
import PostCards from '@/components/PostCards'

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

export default function ListCardsLayoutWithTags({
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
      <div className="border-dark dark:border-light flex flex-wrap justify-center border-b border-t border-solid py-4 text-sm font-medium xl:text-base">
        {sortedTags.map((t) => {
          const isCurrentTag = currentTag === slug(t)
          const tagCount = tagCounts[t]
          return (
            <div key={t} className="mx-1 my-1 xl:mx-2 xl:my-2">
              {isCurrentTag ? (
                <h3 className="ease inline-block rounded-lg bg-gray-300 px-4 py-2 transition-all duration-200 hover:bg-gray-400 dark:text-gray-800">
                  {`${t} (${tagCount})`}
                </h3>
              ) : (
                <Link
                  href={`/tags/${slug(t)}`}
                  className="border-dark dark:border-light ease inline-block rounded-lg border-2 border-solid px-3.5 py-1.5 transition-all duration-200 hover:underline"
                  aria-label={`View posts tagged ${t}`}
                >
                  {`${t} (${tagCount})`}
                </Link>
              )}
            </div>
          )
        })}
      </div>
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
        {renderTags()}
        <div>
          <div className="pb-4 pt-8">
            <PostCards posts={displayPosts} />
          </div>
          {pagination && pagination.totalPages > 1 && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          )}
        </div>
      </div>
    </>
  )
}
