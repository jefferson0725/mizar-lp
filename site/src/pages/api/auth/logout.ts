export const prerender = false;
import type { APIRoute } from 'astro';
import { clearSessionCookie } from '../../../lib/auth';

export const POST: APIRoute = () => {
  return new Response(null, {
    status: 302,
    headers: { 'Set-Cookie': clearSessionCookie(), Location: '/admin' },
  });
};
