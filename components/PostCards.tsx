import PostCard from './PostCard'

function PostCards({ posts }) {
  if (posts.length === 0) {
    return <p>No posts found.</p>
  }

  return (
    <div className="grid justify-between gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <div key={post.path}>
          <PostCard
            slug={post.slug}
            title={post.title}
            summary={post.summary}
            tags={post.tags}
            date={post.date}
            path={post.path}
            images={post.images}
          />
        </div>
      ))}
    </div>
  )
}
export default PostCards
