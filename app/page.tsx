import StoryCard from "../components/StoryCard";
import { getBlogPosts } from "@/lib/contentful";
import { format, parseISO, isValid } from "date-fns";
import { id } from "date-fns/locale";

export const fetchCache = "force-no-store";
export const revalidate = 0;

function fixDateLocal(dateString: string | null | undefined): Date | null {
  if (!dateString) return null;

  const dateOnly = String(dateString).split("T")[0];
  const d = new Date(dateOnly + "T00:00:00");
  return Number.isNaN(d.getTime()) ? null : d;
}

export default async function Page() {
  const posts = await getBlogPosts();

  const latestPosts = posts.slice(0, 2).map(p => ({ ...p }));

  if (!latestPosts || latestPosts.length === 0) {
    return (
      <div className="flex justify-center items-center h-48 text-gray-500">
        <p>Belum ada postingan blog yang dipublikasikan.</p>
      </div>
    );
  }

  return (
    <div className="container-base">
      {/* Quote section */}
      <section className="relative h-[22vh] sm:h-[35vh] bg-white flex items-end justify-end p-4 sm:p-6 mb-10">
        <p className="max-w-xs sm:max-w-sm text-right text-[12px] sm:text-[12px] text-gray-600 leading-relaxed">
          “Seorang penyendiri tidak akan membiarkan orang lain membaca ceritanya  
          kecuali itu teman dekatnya”
          <br />— teman dekatmu
        </p>
      </section>

      {/* Blog header */}
      <section className="mt-4 flex items-center justify-between">
        <h3 className="text-[14px] font-semibold text-gray-700 tracking-wide">
          BLOG
        </h3>
        <a
          href="/blog"
          className="text-[14px] text-pink-600 hover:bg-pink-50 transition font-medium no-underline px-2 py-1 rounded"
        >
          LIHAT BLOG LAINNYA →
        </a>
      </section>

      {/* Stories grid */}
      <section id="stories" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestPosts.map((story) => {
            const f = story.fields;
            const rawDate = f.date;

            let formattedDate = "Tanggal tidak tersedia";

            if (rawDate) {
              const parsed = fixDateLocal(rawDate);
              if (parsed && isValid(parsed)) {
                formattedDate = format(parsed, "dd MMMM yyyy", { locale: id });
              } else {
                formattedDate = "Tanggal tidak valid";
              }
            }

            return (
              <StoryCard
                key={f.slug}
                title={f.title}
                excerpt={f.excerpt}
                slug={f.slug}
                date={formattedDate}
                genre={f.genre}
              />
              
            );
          })}
          
        </div>
      </section>
    </div>
  );
}
