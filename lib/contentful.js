// lib/contentful.js

const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Fungsi untuk mengambil SEMUA postingan blog
export async function getBlogPosts() {
  const entries = await client.getEntries({
    content_type: 'rehansparker', // <--- GANTI INI JIKA ID MODEL ANDA BERBEDA
    select: 'fields.title,fields.slug,fields.excerpt,fields.genre,fields.date', 
    order: '-fields.date',
  });
  return entries.items;
}

// Fungsi untuk mengambil SATU postingan berdasarkan SLUG
export async function getSinglePost(slug) {
    const entries = await client.getEntries({
        content_type: 'rehansparker', // <--- GANTI INI
        'fields.slug': slug,
        limit: 1 // Hanya ambil satu entri
    });
    return entries.items[0]; // Mengembalikan objek postingan pertama
}

export default client;