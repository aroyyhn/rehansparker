import { posts } from '../../data/posts';
import StoryCard from '../../components/StoryCard';

export default function Blog() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">BACA, BLOG!</h1>

      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <StoryCard
            key={post.slug}
            title={post.title}
            excerpt={post.excerpt}
            slug={post.slug}
            date={post.date}
            genre={post.genre}
          />
        ))}
      </div>
    </div>
  );
}
