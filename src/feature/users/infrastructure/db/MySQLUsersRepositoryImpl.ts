import { IUsersRepository } from '../../domain/repository/users_repository';
import { User } from '../../domain/entity/user';
import { query } from '../../../../core/db';

export class MySQLUsersRepositoryImpl implements IUsersRepository {
  async findByUsername(userName: string): Promise<User | null> {
    const rows = await query('SELECT * FROM users WHERE user_name = ? LIMIT 1', [userName]);
    return User.fromRow(rows[0] ?? null);
  }

  async findById(userId: number): Promise<User | null> {
    const rows = await query('SELECT * FROM users WHERE user_id = ? LIMIT 1', [userId]);
    return User.fromRow(rows[0] ?? null);
  }

  async findAll(): Promise<User[]> {
    const rows = await query('SELECT * FROM users');
    return rows
      .map((row: any) => User.fromRow(row))
      .filter((user): user is User => user !== null);
  }

  async create(user: User): Promise<void> {
    await query('INSERT INTO users (user_name, password, hash_method) VALUES (?, ?, ?)', [
      user.userName,
      user.passwordHash,
      user.hashMethod,
    ]);
  }
}
