import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { join } from 'path';

const DB_PATH = process.env.DB_PATH ?? './blog.db';

export interface Post {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  frente: string;
  tags: string[];
  hero_image: string | null;
  draft: boolean;
  pub_date: string;
  updated_date: string | null;
  created_at: string;
}

interface RawPost extends Omit<Post, 'tags' | 'draft'> {
  tags: string;
  draft: number;
}

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (_db) return _db;
  _db = new Database(DB_PATH);
  _db.pragma('journal_mode = WAL');
  _db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      slug        TEXT    UNIQUE NOT NULL,
      title       TEXT    NOT NULL,
      description TEXT    NOT NULL,
      content     TEXT    NOT NULL DEFAULT '',
      author      TEXT    NOT NULL DEFAULT 'Grupo Mizar',
      frente      TEXT    NOT NULL DEFAULT 'blog',
      tags        TEXT    NOT NULL DEFAULT '[]',
      hero_image  TEXT,
      draft       INTEGER NOT NULL DEFAULT 0,
      pub_date    TEXT    NOT NULL,
      updated_date TEXT,
      created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    )
  `);
  seedIfEmpty(_db);
  return _db;
}

function parse(raw: RawPost): Post {
  return {
    ...raw,
    tags: JSON.parse(raw.tags ?? '[]'),
    draft: raw.draft === 1,
  };
}

function seedIfEmpty(db: Database.Database) {
  const count = (db.prepare('SELECT COUNT(*) as n FROM posts').get() as { n: number }).n;
  if (count > 0) return;

  const mdDir = join(process.cwd(), 'src/content/blog');
  const files = [
    'apartamentos-vis-giron-sin-bancos.md',
    'invertir-en-colombia-desde-el-exterior.md',
    'respaldo-constructora-propiedades-a-cuotas.md',
  ];

  const insert = db.prepare(`
    INSERT OR IGNORE INTO posts (slug, title, description, content, author, frente, tags, draft, pub_date)
    VALUES (@slug, @title, @description, @content, @author, @frente, @tags, @draft, @pub_date)
  `);

  for (const file of files) {
    try {
      const raw = readFileSync(join(mdDir, file), 'utf-8').replace(/^﻿/, '');
      const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      if (!match) continue;
      const fm = match[1];
      const content = match[2].trim();

      const title = fm.match(/^title:\s*"?(.+?)"?\s*$/m)?.[1] ?? '';
      const description = fm.match(/^description:\s*"?(.+?)"?\s*$/m)?.[1] ?? '';
      const author = fm.match(/^author:\s*"?(.+?)"?\s*$/m)?.[1] ?? 'Grupo Mizar';
      const frente = fm.match(/^frente:\s*"?(.+?)"?\s*$/m)?.[1] ?? 'blog';
      const pub_date = fm.match(/^pubDate:\s*(.+?)\s*$/m)?.[1] ?? new Date().toISOString().slice(0, 10);
      const draft = fm.match(/^draft:\s*true/m) ? 1 : 0;
      const tagLines = [...fm.matchAll(/^\s+-\s+"?(.+?)"?\s*$/gm)].map((m) => m[1]);
      const slug = file.replace('.md', '');

      insert.run({ slug, title, description, content, author, frente, tags: JSON.stringify(tagLines), draft, pub_date });
    } catch {
      // archivo no encontrado, skip
    }
  }
}

export function getAllPosts(includeDrafts = false): Post[] {
  const db = getDb();
  const rows = includeDrafts
    ? db.prepare('SELECT * FROM posts ORDER BY pub_date DESC').all()
    : db.prepare('SELECT * FROM posts WHERE draft = 0 ORDER BY pub_date DESC').all();
  return (rows as RawPost[]).map(parse);
}

export function getPostBySlug(slug: string): Post | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM posts WHERE slug = ?').get(slug) as RawPost | undefined;
  return row ? parse(row) : null;
}

export function getPostById(id: number): Post | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM posts WHERE id = ?').get(id) as RawPost | undefined;
  return row ? parse(row) : null;
}

export function createPost(data: Omit<Post, 'id' | 'created_at'>): Post {
  const db = getDb();
  const result = db.prepare(`
    INSERT INTO posts (slug, title, description, content, author, frente, tags, hero_image, draft, pub_date, updated_date)
    VALUES (@slug, @title, @description, @content, @author, @frente, @tags, @hero_image, @draft, @pub_date, @updated_date)
  `).run({ ...data, tags: JSON.stringify(data.tags), draft: data.draft ? 1 : 0 });
  return getPostById(result.lastInsertRowid as number)!;
}

export function updatePost(id: number, data: Partial<Omit<Post, 'id' | 'created_at'>>): Post {
  const db = getDb();
  const current = getPostById(id)!;
  const merged = {
    ...current,
    ...data,
    tags: JSON.stringify(data.tags ?? current.tags),
    draft: (data.draft ?? current.draft) ? 1 : 0,
    updated_date: new Date().toISOString().slice(0, 10),
  };
  db.prepare(`
    UPDATE posts SET slug=@slug, title=@title, description=@description, content=@content,
    author=@author, frente=@frente, tags=@tags, hero_image=@hero_image, draft=@draft,
    pub_date=@pub_date, updated_date=@updated_date WHERE id=@id
  `).run({ ...merged, id });
  return getPostById(id)!;
}

export function deletePost(id: number): void {
  getDb().prepare('DELETE FROM posts WHERE id = ?').run(id);
}
