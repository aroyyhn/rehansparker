import Link from 'next/link';

interface StoryCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  genre: string[] | string; // ← BIAR AMAN
}

export default function StoryCard({ title, excerpt, slug, date, genre }: StoryCardProps) {

  const safeGenre = Array.isArray(genre) ? genre : [genre]; // ← FIX INTI
  console.log("slug card:", slug);

  return (
    <Link
      href={`/blog/${slug}`}
      className="block text-inherit no-underline hover:no-underline"
    >
      <article className="h-full bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col">
        <h3 className="text-[17px] font-semibold mb-1">{title}</h3>

        {safeGenre.length > 0 && (
          <p className="text-[12px] text-gray-500 mb-2 capitalize">
            {safeGenre.join(", ")}
          </p>
        )}

        <p className="text-gray-600 text-[12px] leading-snug mb-3">{excerpt}</p>

        {date && <p className="text-[11px] text-gray-400 mt-auto">{date}</p>}
      </article>
    </Link>
  );
}
