import StoryCard from '../../components/StoryCard';
import { getBlogPosts } from '@/lib/contentful';
import { format, isValid } from 'date-fns';
import { id } from 'date-fns/locale';

export const fetchCache = "force-no-store";
export const revalidate = 0;

function fixDateLocal(dateString: string | null | undefined): Date | null {
  if (!dateString) return null;

  // Pastikan hanya ambil tanggalnya (hindari timezone shifting)
  const dateOnly = String(dateString).split("T")[0]; // contoh: "2025-10-30"

  const d = new Date(dateOnly + "T00:00:00"); // paksa jadi local date
  return Number.isNaN(d.getTime()) ? null : d;
}


export default async function Blog() {
  const posts = await getBlogPosts();

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
          const rawDate = story.fields.date as string;
          const dateObj = fixDateLocal(rawDate);
          const formattedDateString =
            dateObj && isValid(dateObj)
              ? format(dateObj, "dd MMMM yyyy", { locale: id })
              : "Tanggal tidak valid";

          return (
            <StoryCard
              key={story.fields.slug}
              title={story.fields.title as string}
              excerpt={story.fields.excerpt as string}
              slug={story.fields.slug as string}
              date={formattedDateString}
              genre={story.fields.genre as string[]}
            />
          );
        })}
      </div>
    </div>
  );
}