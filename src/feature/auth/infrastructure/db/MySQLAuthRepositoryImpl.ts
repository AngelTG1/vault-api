import { IAuthRepository } from '../../domain/repository/auth_repository';
import { Auth } from '../../domain/entity/auth';
import { v4 as uuidv4 } from 'uuid';
import { query } from '../../../../core/db';

export class MySQLAuthRepositoryImpl implements IAuthRepository {
  async findByUsername(username: string): Promise<Auth | null> {
    const rows = await query('SELECT * FROM auth WHERE username = ? LIMIT 1', [username]);
    return Auth.fromRow(rows[0] ?? null);
  }

  async findByEmail(email: string): Promise<Auth | null> {
    const rows = await query('SELECT * FROM auth WHERE email = ? LIMIT 1', [email]);
    return Auth.fromRow(rows[0] ?? null);
  }

  async findById(id: string): Promise<Auth | null> {
    const rows = await query('SELECT * FROM auth WHERE id = ? LIMIT 1', [id]);
    return Auth.fromRow(rows[0] ?? null);
  }

  async create(user: Auth): Promise<void> {
    await query(
      'INSERT INTO auth (id, username, email, password_hash, is_admin) VALUES (?, ?, ?, ?, ?)',
      [user.id, user.username, user.email, user.passwordHash, user.isAdmin ? 1 : 0]
    );
  }

  async update(user: Auth): Promise<void> {
    await query(
      'UPDATE auth SET username = ?, email = ?, password_hash = ?, is_admin = ? WHERE id = ?',
      [user.username, user.email, user.passwordHash, user.isAdmin ? 1 : 0, user.id]
    );
  }
}
