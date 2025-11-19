"use client";

import { useState } from "react";

export default function AddPostPage() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = title.toLowerCase().replace(/\s+/g, "-");

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug,
        genre,
        excerpt,
        content,
        date: new Date().toISOString()
      })
    });

    const data = await res.json();
    if (data.success) alert("Blog berhasil ditambahkan!");
    else alert("Gagal: " + data.error);

    setTitle(""); setGenre(""); setExcerpt(""); setContent("");
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-6">
      <h1 className="text-lg font-semibold mb-4">Tambah Blog Baru</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Judul"
          required
          className="border border-gray-200 rounded px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-pink-600"
        />
        <input
          value={genre}
          onChange={e => setGenre(e.target.value)}
          placeholder="Genre"
          className="border border-gray-200 rounded px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-pink-600"
        />
        <textarea
          value={excerpt}
          onChange={e => setExcerpt(e.target.value)}
          placeholder="Excerpt"
          className="border border-gray-200 rounded px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-pink-600 resize-none"
        />
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Konten blog (HTML atau teks)"
          className="border border-gray-200 rounded px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-pink-600 resize-none h-36"
        />
        <button
          type="submit"
          className="bg-pink-600 text-white px-4 py-2 rounded text-sm hover:bg-pink-700 transition"
        >
          Tambah Blog
        </button>
      </form>
    </div>
  );
}
