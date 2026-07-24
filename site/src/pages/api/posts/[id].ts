export const prerender = false;
import type { APIRoute } from 'astro';
import { checkAuth } from '../../../lib/auth';
import { updatePost, deletePost } from '../../../lib/db';

export const PUT: APIRoute = async ({ request, params }) => {
  if (!checkAuth(request)) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
  }

  try {
    const id = Number(params.id);
    const body = await request.json();
    const post = updatePost(id, {
      slug: body.slug,
      title: body.title,
      description: body.description,
      content: body.content,
      author: body.author,
      frente: body.frente,
      tags: Array.isArray(body.tags) ? body.tags : [],
      hero_image: body.hero_image ?? null,
      draft: body.draft ?? false,
      pub_date: body.pub_date,
    });
    return new Response(JSON.stringify({ ok: true, slug: post.slug }));
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message ?? 'Error interno' }), { status: 500 });
  }
};

export const DELETE: APIRoute = ({ request, params }) => {
  if (!checkAuth(request)) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
  }

  try {
    deletePost(Number(params.id));
    return new Response(JSON.stringify({ ok: true }));
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message ?? 'Error interno' }), { status: 500 });
  }
};
