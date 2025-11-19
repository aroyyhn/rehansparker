// lib/contentful.js
const contentful = require("contentful");

// Buat client Contentful
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Helper: aman dari string/number/boolean/null/locale object
function safe(field) {
  if (typeof field === "string") return field;
  if (typeof field === "number") return String(field);
  if (typeof field === "boolean") return String(field);
  if (field && typeof field === "object" && field["en-US"]) return field["en-US"];
  return "";
}

// ==============================
// GET ALL POSTS
// ==============================
async function getBlogPosts() {
  const entries = await client.getEntries({
    content_type: "rehansparker",
    select: "fields",
    order: "-fields.date",
    locale: "en-US",
  });

  return entries.items.map(item => {
    const f = item.fields;
    return {
      fields: {
        title: safe(f.title),
        slug: safe(f.slug),
        excerpt: safe(f.excerpt),
        genre: Array.isArray(f.genre) ? f.genre.map(safe) : [safe(f.genre)],
        date: safe(f.date),
      }
    };
  });
}

// ==============================
// GET SINGLE POST
// ==============================
async function getSinglePost(slug) {
  // Ambil slug exact match
  const entries = await client.getEntries({
    content_type: "rehansparker",
    "fields.slug": slug, // pastikan field slug dipakai
    limit: 1,
    locale: "en-US",
    include: 2,
  });

  // Cek apakah ada post
  if (!entries.items || entries.items.length === 0) return null;

  const f = entries.items[0].fields;

  // Ambil content dari locale en-US jika ada
  const content = f.content?.['en-US'] || f.content || null;

  return {
    fields: {
      title: safe(f.title),
      slug: safe(f.slug),
      excerpt: safe(f.excerpt),
      genre: Array.isArray(f.genre) ? f.genre.map(safe) : [safe(f.genre)],
      date: safe(f.date),
      content,
    }
  };
}

module.exports = {
  client,
  getBlogPosts,
  getSinglePost
};
