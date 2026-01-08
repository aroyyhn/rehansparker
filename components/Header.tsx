import { Home, BookOpen, User } from "lucide-react";

export default function Header() {
  return (
    <header className="py-4 border-b bg-white/80 backdrop-blur">
      <div className="container-base flex items-center justify-between px-4">
        
        {/* LOGO */}
        <a href="/" className="flex items-center gap-3 no-underline">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            R
          </div>
          <span className="text-lg font-semibold hidden sm:block">
            rehansparker.jurnal
          </span>
        </a>

        {/* NAV */}
        <nav className="flex items-center gap-4 mr-6">
          
          {/* BLOG */}
          <a href="/blog" className="flex items-center">
            <BookOpen size={20} />
          </a>

          {/* ABOUT */}
          <a href="/about" className="flex items-center">
            <User size={20} />
          </a>

        </nav>
      </div>
    </header>
  );
}
