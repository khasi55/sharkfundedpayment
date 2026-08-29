import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import pg from 'pg';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sql = readFileSync(path.join(__dirname, '..', 'postgres_schema.sql'), 'utf8');

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
const pool = new pg.Pool({
    connectionString,
    ssl: connectionString.includes('sslmode=require') ? { rejectUnauthorized: false } : false,
});

try {
    await pool.query(sql);
    console.log('[migrate] schema applied');
} finally {
    await pool.end();
}
