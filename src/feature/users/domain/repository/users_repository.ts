import { User } from '../entity/user';

export interface IUsersRepository {
  findByUsername(userName: string): Promise<User | null>;
  findById(userId: number): Promise<User | null>;
  create(user: User): Promise<void>;
}
