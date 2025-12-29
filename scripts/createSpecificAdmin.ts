#!/usr/bin/env ts-node

import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { query } from '../src/core/db';

async function main() {
  const username = 'angeltg';
  const email = 'angeljtg1@gmail.com';
  const password = 'Angel123';

  // check existing
  const existing = await query('SELECT id FROM auth WHERE username = ? LIMIT 1', [username]);
  if (existing.length > 0) {
    console.error('Ya existe un usuario con ese username. Abortando.');
    process.exit(1);
  }

  const id = uuidv4();
  const passwordHash = await bcrypt.hash(password, 10);

  await query(
    'INSERT INTO auth (id, username, email, password_hash, is_admin, created_at, updated_at) VALUES (?, ?, ?, ?, 1, NOW(), NOW())',
    [id, username, email, passwordHash]
  );

  console.log('Admin creado con éxito: ', { id, username, email });
  console.log('Password (plain):', password);
  process.exit(0);
}

main().catch((err) => {
  console.error('Error al crear admin:', err && err.message ? err.message : err);
  process.exit(1);
});