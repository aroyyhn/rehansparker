import Link from 'next/link';

interface StoryCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string; // sudah formatted string
  genre: string;
}

export default function StoryCard({ title, excerpt, slug, date, genre }: StoryCardProps) {

  return (
    <Link
      href={`/blog/${slug}`}
      className="block text-inherit no-underline hover:no-underline"
    >
      <article className="h-full bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col">
        <h3 className="text-[17px] font-semibold mb-1">{title}</h3>
        {genre && <p className="text-[12px] text-gray-500 mb-2 capitalize">{genre}</p>}
        <p className="text-gray-600 text-[14px] leading-snug mb-3">{excerpt}</p>

        {/* tampilkan string tanggal langsung */}
        {date && <p className="text-[11px] text-gray-400 mt-auto">{date}</p>}
      </article>
    </Link>
  );
}
