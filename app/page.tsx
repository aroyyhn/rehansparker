import StoryCard from "../components/StoryCard";
import { getBlogPosts } from "@/lib/contentful"; // Menggunakan alias path untuk kejelasan
import { format } from 'date-fns';
import { id } from 'date-fns/locale'; 

// Komponen Server Asynchronous untuk fetching data
export default async function Page() { 
  // 3. Panggil fungsi fetching di sini
  const posts = await getBlogPosts();

  // Pastikan posts yang didapat dari API tidak kosong
  if (!posts || posts.length === 0) {
    return (
      <div className="flex justify-center items-center h-48 text-gray-500">
        <p>Belum ada postingan blog yang dipublikasikan.</p>
      </div>
    );
  }
  
  return (
    <div className="mx-auto pl-6">
      <section className="relative h-[35vh] bg-white flex items-end justify-end p-8 mb-10">
        <p className="max-w-xs text-right text-[13px] text-gray-600 leading-relaxed">
          “seorang penyendiri tidak akan membiarkan orang lain membaca ceritanya  
          kecuali itu teman dekatnya”
          <br />— teman dekatmu
        </p>
      </section>  

      <section className="mt-4 flex items-center justify-between">
        <h3 className="text-[14px] font-semibold text-gray-700 tracking-wide">
          BLOG
        </h3>
        <a
          href="/blog"
          className="text-[14px] text-pink-600 hover:bg-pink-50 transition font-medium no-underline"
        >
          LIHAT BLOG LAINNYA →
        </a>
      </section>

      <section id="stories" className="mt-6"> 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((story) => {
            // Logika pemformatan tanggal yang aman
            const dateObj = new Date(story.fields.date as string); 
            const formattedDateString = format(dateObj, 'dd MMMM yyyy', { locale: id });
            
            return (
              <StoryCard
                key={story.fields.slug} 
                title={story.fields.title as string}
                excerpt={story.fields.excerpt as string}
                slug={story.fields.slug as string}
                // Lewatkan string tanggal yang sudah diformat
                date={formattedDateString}
                genre={story.fields.genre as string}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}