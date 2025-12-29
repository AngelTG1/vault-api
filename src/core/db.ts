import mysql from 'mysql2/promise';
import { config } from './config';

const pool = mysql.createPool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  waitForConnections: true,
  connectionLimit: 10,
});

let connected = false;
let reconnectLoopRunning = false;

export async function connect(): Promise<void> {
  // Attempt to get a connection and ping the server to verify connectivity
  const conn = await pool.getConnection();
  try {
    await conn.ping();
    connected = true;
  } finally {
    conn.release();
  }
}

export function isConnected() {
  return connected;
}

export function startBackgroundReconnect(initialDelay = 2000, maxDelay = 60000) {
  if (reconnectLoopRunning) return;
  reconnectLoopRunning = true;

  (async () => {
    let delay = initialDelay;
    while (!connected) {
      try {
        console.log('Intentando conectar a la base de datos...');
        await connect();
        console.log('Conectado a la base de datos');
        break;
      } catch (err: any) {
        connected = false;
        console.error('Error al conectar a la base de datos:', err && err.message ? err.message : err);
        console.log(`Reintentando en ${Math.round(delay / 1000)}s...`);
        await new Promise((r) => setTimeout(r, delay));
        delay = Math.min(delay * 2, maxDelay);
      }
    }
    reconnectLoopRunning = false;
  })();
}

export async function query<T = any>(sql: string, params: any[] = []) {
  const [rows] = await pool.query<T & mysql.RowDataPacket[]>(sql, params);
  return rows as T[];
}

export default pool;
