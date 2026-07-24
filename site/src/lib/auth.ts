const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'mizar2024';
const SESSION_SECRET = process.env.SESSION_SECRET ?? 'mizar-secret-key';
const COOKIE_NAME = 'admin_session';
const TOKEN = Buffer.from(`${SESSION_SECRET}:authenticated`).toString('base64');

export function checkAuth(request: Request): boolean {
  const cookie = request.headers.get('cookie') ?? '';
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`));
  return match?.[1] === TOKEN;
}

export function createSessionCookie(password: string): string | null {
  if (password !== ADMIN_PASSWORD) return null;
  return `${COOKIE_NAME}=${TOKEN}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`;
}

export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}
