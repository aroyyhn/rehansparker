export default function Header() {
  return (
    <header className="py-6 border-b bg-white/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-8 flex items-center justify-between">
        
        {/* LOGO */}
        <a href="/" className="flex items-center gap-3 no-underline">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            R
          </div>
          <div className="text-lg font-semibold">rehansparker.jurnal</div>
        </a>

        {/* NAV */}
        <nav className="flex items-center gap-6">
          <a href="/blog" className="text-sm font-medium no-underline">Blog</a>
          <a href="/about" className="text-sm font-medium no-underline">Tentang</a>
        </nav>
      </div>
    </header>
  );
}
