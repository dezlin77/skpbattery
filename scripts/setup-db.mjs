import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

await client.execute(`
  CREATE TABLE IF NOT EXISTS simulations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT NOT NULL,
    cell_count INTEGER,
    c_rate REAL,
    ambient_temp REAL,
    max_temp REAL,
    avg_temp REAL,
    hash TEXT NOT NULL
  )
`);

console.log('✅ Database table created successfully');
process.exit(0);