import { posts } from '../../../data/posts';
import Link from 'next/link';

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params; // ✨ unwrap Promise

  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return <div className="text-center py-10">Post tidak ditemukan</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <Link href="/blog" className="inline-block mb-6 text-pink-600 hover:text-pink-800">
        ← Kembali ke Blog
      </Link>

      <article className="bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500 mb-6">{post.date} • {post.genre}</p>
        <div className="prose whitespace-pre-line">
          {post.content.split('\n').map((line, i) => <p key={i}>{line}</p>)}
        </div>
      </article>
    </div>
  );
}
