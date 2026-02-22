import { User } from '../entity/user';

export interface IUsersRepository {
  findByUsername(userName: string): Promise<User | null>;
  findById(userId: number): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(user: User): Promise<void>;
  updateActivation(userId: number, isActive: boolean, desactivedAt: Date | null): Promise<void>;
}
