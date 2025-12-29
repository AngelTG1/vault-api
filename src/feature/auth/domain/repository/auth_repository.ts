import { Auth } from '../entity/auth';

export interface IAuthRepository {
  findByUsername(username: string): Promise<Auth | null>;
  findByEmail(email: string): Promise<Auth | null>;
  findById(id: string): Promise<Auth | null>;
  create(user: Auth): Promise<void>;
  update(user: Auth): Promise<void>;
}
