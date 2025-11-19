// pages/blog/[slug].tsx
import { getSinglePost } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { Document } from '@contentful/rich-text-types';
import { format, isValid } from 'date-fns';
import { id } from 'date-fns/locale';

export const fetchCache = "force-no-store";
export const revalidate = 0;

function fixDateLocal(dateString: string | null | undefined): Date | null {
  if (!dateString) return null;
  const dateOnly = dateString.split("T")[0];
  const [year, month, day] = dateOnly.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return Number.isNaN(d.getTime()) ? null : d;
}

interface PostPageProps {
  params: { slug: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  // 🔹 Debug: cek slug yang diterima
  console.log("PostPage slug diterima:", slug);

  const post = await getSinglePost(slug);

  // 🔹 Debug: cek data post dari Contentful
  console.log("Data post:", post);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold">404</h1>
        <p className="text-gray-600">Postingan dengan slug "{slug}" tidak ditemukan.</p>
      </div>
    );
  }

  const { title, genre, date, content } = post.fields;

  let formattedDate = "Tanggal tidak tersedia";
  const dateObj = fixDateLocal(date);

  if (dateObj && isValid(dateObj)) {
    formattedDate = format(dateObj, "dd MMMM yyyy", { locale: id });
  } else if (date) {
    formattedDate = "Tanggal tidak valid";
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 md:px-0">
      {genre && (
        <p className="text-sm text-pink-600 font-medium mb-1 uppercase tracking-wider">
          {Array.isArray(genre) ? genre.join(", ") : String(genre)}
        </p>
      )}

      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{title}</h1>

      <p className="text-base text-gray-500 mb-10 border-b pb-4">
        Dipublikasikan pada {formattedDate}
      </p>

      <div className="prose prose-md max-w-none text-gray-700">
        {content ? documentToReactComponents(content as Document) : <p>Konten belum tersedia.</p>}
      </div>

      <div className="mt-12">
        <a href="/blog" className="inline-block text-pink-600 hover:text-pink-800 font-semibold">
          ← Kembali ke Daftar Blog
        </a>
      </div>
    </div>
  );
}
