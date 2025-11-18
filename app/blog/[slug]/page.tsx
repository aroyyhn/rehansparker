import { getSinglePost } from '@/lib/contentful'; // Import fungsi single post
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'; // Library untuk Rich Text
import { format } from 'date-fns';
import { id } from 'date-fns/locale'; 

// Anda perlu mendefinisikan tipe props untuk App Router
interface PostPageProps {
  params: {
    slug: string;
  };
}

// Komponen Server Asynchronous untuk fetching data
export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params;

  // Panggil fungsi fetching
  const post = await getSinglePost(slug); 

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold">404</h1>
        <p className="text-gray-600">Postingan dengan slug "{slug}" tidak ditemukan.</p>
      </div>
    );
  }

  const { title, genre, date, content } = post.fields;
  
  // 1. Pemformatan Tanggal ke format Indonesia
  const dateObj = new Date(date as string); 
  const formattedDate = format(dateObj, 'dd MMMM yyyy', { locale: id });

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 md:px-0">
      
      {/* Metadata Rapi */}
      <p className="text-sm text-pink-600 font-medium mb-1 uppercase tracking-wider">
        {genre as string}
      </p>
      
      <h1 className="text-4xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
        {title as string}
      </h1>
      
      <p className="text-base text-gray-500 mb-10 border-b pb-4">
        Dipublikasikan pada {formattedDate}
      </p>
      
      {/* 2. Styling Typography */}
      {/* Kelas 'prose' dari Tailwind memberikan styling margin, line-height, dan ukuran font yang rapi untuk konten Rich Text. */}
      <div className="prose prose-md max-w-none text-gray-700">
        {/* Render konten Rich Text */}
        {documentToReactComponents(content)} 
      </div>
      
      {/* Tombol kembali ke Blog */}
      <div className="mt-12">
        <a href="/blog" className="text-pink-600 hover:text-pink-800 transition font-semibold">
          ← Kembali ke Daftar Blog
        </a>
      </div>
    </div>
  );
}