import { NextRequest, NextResponse } from "next/server";
import { createClient } from "contentful-management";

const client = createClient({
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!
});

export async function POST(req: NextRequest) {
  const { title, slug, genre, excerpt, content, date } = await req.json();

  try {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID!);
    const env = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT!);

    const entry = await env.createEntry("rehansparker", { // ganti "blogPost" sesuai content type kamu
      fields: {
        title: { "en-US": title },
        slug: { "en-US": slug },
        genre: { "en-US": genre },
        excerpt: { "en-US": excerpt },
        content: { "en-US": content },
        date: { "en-US": date }
      }
    });

    // Publish entry supaya muncul di public API
    await entry.publish();

    return NextResponse.json({ success: true, entryId: entry.sys.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
