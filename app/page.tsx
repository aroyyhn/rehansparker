import { posts } from "../data/posts";
import StoryCard from "../components/StoryCard";

export default function Home() {
  return (
    <div className="">

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
      {posts.map(story => (
        <StoryCard
          key={story.slug}
          title={story.title}
          excerpt={story.excerpt}
          slug={story.slug}
          date={story.date}
          genre={story.genre}
        />
      ))}
    </div>
    </section>


    </div>
  );
}
