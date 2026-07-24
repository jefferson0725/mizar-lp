export const prerender = false;
import type { APIRoute } from 'astro';
import { checkAuth } from '../../../lib/auth';
import { createPost } from '../../../lib/db';

export const POST: APIRoute = async ({ request }) => {
  if (!checkAuth(request)) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
  }

  try {
    const body = await request.json();
    const post = createPost({
      slug: body.slug,
      title: body.title,
      description: body.description,
      content: body.content ?? '',
      author: body.author ?? 'Grupo Mizar',
      frente: body.frente ?? 'blog',
      tags: Array.isArray(body.tags) ? body.tags : [],
      hero_image: body.hero_image ?? null,
      draft: body.draft ?? false,
      pub_date: body.pub_date ?? new Date().toISOString().slice(0, 10),
      updated_date: null,
    });
    return new Response(JSON.stringify({ ok: true, slug: post.slug }), { status: 201 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message ?? 'Error interno' }), { status: 500 });
  }
};
