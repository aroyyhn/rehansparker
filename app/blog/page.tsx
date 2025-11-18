import StoryCard from '../../components/StoryCard';
import { getBlogPosts } from '@/lib/contentful'; // Import fungsi fetching
import { format } from 'date-fns';
import { id } from 'date-fns/locale'; 

// Komponen Server Asynchronous untuk fetching data
export default async function Blog() {
  const posts = await getBlogPosts();

  // Handle jika tidak ada postingan
  if (!posts || posts.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6">BACA, BLOG!</h1>
        <p className="text-gray-500">Saat ini belum ada postingan yang dipublikasikan.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">BACA, BLOG!</h1>

      <div className="grid grid-cols-1 gap-4">
        {posts.map((story) => {
          const dateObj = new Date(story.fields.date as string); 
          const formattedDateString = format(dateObj, 'dd MMMM yyyy', { locale: id });

          return (
            <StoryCard
              key={story.fields.slug}
              title={story.fields.title as string}
              excerpt={story.fields.excerpt as string}
              slug={story.fields.slug as string}
              date={formattedDateString}
              genre={story.fields.genre as string}
            />
          );
        })}
      </div>
    </div>
  );
}