-- Contact inbox for the portfolio form. Turso (LibSQL).
-- Create it once:
--   turso db create portfolio-contact
--   turso db shell portfolio-contact < turso.sql
-- Then copy the DB URL + auth token into Vercel env vars:
--   TURSO_DATABASE_URL   e.g. libsql://portfolio-contact-<you>.turso.io
--   TURSO_AUTH_TOKEN     from: turso db tokens create portfolio-contact
--
-- Read messages later with:
--   turso db shell portfolio-contact "select * from contact_messages order by created_at desc;"

create table if not exists contact_messages (
  id integer primary key autoincrement,
  name text not null,
  email text not null,
  message text not null,
  created_at text not null default (strftime('%Y-%m-%dT%H:%M:%SZ','now'))
);
