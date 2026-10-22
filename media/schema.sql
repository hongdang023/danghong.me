-- D1 schema for media.danghong.me (database: danghong-media, binding: DB).
-- Apply: npx wrangler d1 execute danghong-media --remote --file schema.sql

-- Single JSON documents: profile, about.
CREATE TABLE IF NOT EXISTS documents (
  key TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Ordered lists: albums, stories, people, links, videos. `data` is the item as JSON;
-- people and links carry a `group` field that the site groups by.
CREATE TABLE IF NOT EXISTS items (
  collection TEXT NOT NULL,
  id TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  data TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (collection, id)
);

-- Metadata of every object in the R2 bucket (danghong-media, binding: BUCKET). `path` is the R2 key
-- and the public URL path: https://media.danghong.me/<path>.
CREATE TABLE IF NOT EXISTS files (
  path TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  content_type TEXT,
  size INTEGER NOT NULL DEFAULT 0,
  title TEXT,
  alt TEXT,
  description TEXT,
  tags TEXT NOT NULL DEFAULT '[]',
  uploaded_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
