import { Pool, QueryResult, QueryResultRow } from 'pg';

const connectionString =
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL;

let pool: Pool;

if (connectionString && (connectionString.startsWith('postgres://') || connectionString.startsWith('postgresql://'))) {
    pool = new Pool({
        connectionString,
        ssl: process.env.NODE_ENV === 'production' || connectionString.includes('sslmode=require')
            ? { rejectUnauthorized: false }
            : false,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
    });
} else {
    pool = new Pool({
        host: process.env.POSTGRES_HOST || process.env.DB_HOST || 'localhost',
        port: Number(process.env.POSTGRES_PORT || process.env.DB_PORT || 5432),
        user: process.env.POSTGRES_USER || process.env.DB_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || process.env.DB_PASSWORD || '',
        database: process.env.POSTGRES_DB || process.env.DB_NAME || 'sharkpay',
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
    });
}

export async function query<T extends QueryResultRow = any>(
    text: string,
    params?: any[]
): Promise<QueryResult<T>> {
    const start = Date.now();
    try {
        const res = await pool.query<T>(text, params);
        const duration = Date.now() - start;
        if (process.env.NODE_ENV !== 'production') {
            console.log('[DB Query]', { text: text.slice(0, 80), duration: `${duration}ms`, rows: res.rowCount });
        }
        return res;
    } catch (error) {
        console.error('[DB Query Error]', { text, error });
        throw error;
    }
}

export async function getClient() {
    const client = await pool.connect();
    return client;
}

export default pool;
