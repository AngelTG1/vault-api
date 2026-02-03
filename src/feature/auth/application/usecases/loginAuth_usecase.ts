import { IAuthRepository } from '../../domain/repository/auth_repository';
import { bcryptService } from '../services/bcryptService';
import { jwtService } from '../services/jwtService';

export class LoginAuthUsecase {
  constructor(private repo: IAuthRepository) {}

  async execute({ username, password }: { username: string; password: string }) {
    const user = await this.repo.findByUsername(username);
    if (!user) throw new Error('User not found');

    const ok = await bcryptService.compare(password, user.passwordHash);
    if (!ok) throw new Error('Invalid credentials');

    const token = jwtService.sign({ sub: user.id, username: user.username, fullName: user.fullName, isAdmin: user.isAdmin });

    return { token, user: { id: user.id, username: user.username, fullName: user.fullName, isAdmin: user.isAdmin } };
  }
}
