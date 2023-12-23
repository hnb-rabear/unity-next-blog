import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Image from 'next/image'
import PostStats from '@/components/PostStats'
import PostCard from '@/components/PostCard'
import PostCards from '@/components/PostCards'

const MAX_DISPLAY = 6

export default function Home({ posts }) {
  function renderPosts() {
    if (posts.length === 0) {
      return <p>No posts found.</p>
    }

    return posts.slice(0, MAX_DISPLAY).map((post) => {
      const { slug, date, title, summary, tags, images } = post

      return (
        <li key={slug} className="py-12">
          <article>
            <div className="space-y-2 duration-300 hover:-translate-y-1 hover:scale-[101%] lg:grid lg:grid-cols-4 lg:items-baseline lg:space-y-0">
              <div>
                <p className="sr-only">Published on</p>
                <div className="text-base font-medium leading-6 text-gray-600 dark:text-gray-300">
                  <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                </div>

                {images && images.length > 0 && (
                  <Image
                    src={images[0]}
                    alt="Post Image"
                    width={480}
                    height={270}
                    className="flex h-auto w-full rounded lg:max-h-[480px] lg:max-w-[270px] lg:px-0 lg:pr-4 lg:pt-4"
                  ></Image>
                )}
              </div>
              <div className="space-y-5 lg:col-span-3">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold leading-8 tracking-tight">
                      <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                        {title}
                      </Link>
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                  <div className="prose max-w-none text-gray-600 dark:text-gray-300">{summary}</div>
                </div>
                <div className="text-base font-medium leading-6">
                  <Link
                    href={`/blog/${slug}`}
                    className="text-primary-500 hover:font-bold hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Read more: "${title}"`}
                  >
                    Read more &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </li>
      )
    })
  }

  const displayPosts = posts.slice(0, MAX_DISPLAY)

  return (
    <>
      <PostStats slug="home" />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Welcome
          </h1>
          <p className="text-lg leading-7 text-gray-600 dark:text-gray-300">
            {siteMetadata.description}
          </p>
        </div>
        <div className="pb-4 pt-8">
          {/* Recent post cards */}
          <PostCards posts={displayPosts} />
        </div>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
