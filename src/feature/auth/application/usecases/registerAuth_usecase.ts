import { IAuthRepository } from '../../domain/repository/auth_repository';
import { Auth } from '../../domain/entity/auth';
import { v4 as uuidv4 } from 'uuid';
import { bcryptService } from '../services/bcryptService';

export class RegisterAuthUsecase {
  constructor(private repo: IAuthRepository) {}

  async execute({ username, fullName, email, password, isAdmin = false }: { username: string; fullName: string, email?: string; password: string; isAdmin?: boolean }) {
    const existing = await this.repo.findByUsername(username);
    if (existing) throw new Error('Username already exists');

    const passwordHash = await bcryptService.hash(password);
    const auth = new Auth({
      id: uuidv4(),
      username,
      fullName,
      email: email ?? null,
      passwordHash,
      isAdmin,
    });

    await this.repo.create(auth);

    return { id: auth.id, username: auth.username, fullName: auth.fullName, email: auth.email, isAdmin: auth.isAdmin };
  }
}
