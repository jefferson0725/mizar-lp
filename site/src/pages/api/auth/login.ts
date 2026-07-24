export const prerender = false;
import type { APIRoute } from 'astro';
import { createSessionCookie } from '../../../lib/auth';

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const password = form.get('password')?.toString() ?? '';
  const cookie = createSessionCookie(password);

  if (!cookie) {
    return new Response(null, {
      status: 302,
      headers: { Location: '/admin?error=1' },
    });
  }

  return new Response(null, {
    status: 302,
    headers: { 'Set-Cookie': cookie, Location: '/admin/posts' },
  });
};
