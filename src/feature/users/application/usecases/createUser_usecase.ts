import { IUsersRepository } from '../../domain/repository/users_repository';
import { User } from '../../domain/entity/user';
import { createHash } from 'crypto';

export class CreateUserUsecase {
  constructor(private repo: IUsersRepository) {}

  async execute({ userName, password, email, name, apellidoPaterno, apellidoMaterno }: { userName: string; password: string, email: string, name: string, apellidoPaterno: string, apellidoMaterno: string }) {
    const existing = await this.repo.findByUsername(userName);
    if (existing) throw new Error('Username already exists');

    const hashMethod = 'SHA1';
    const hash = createHash('sha1').update(password).digest('hex');
    const user = new User({ userName, passwordHash: hash, hashMethod, email, name, apellidoPaterno, apellidoMaterno });

    await this.repo.create(user);

    return {
      userName: user.userName,
      hashMethod: user.hashMethod,
      email: user.email,
      name: user.name,
      apellidoPaterno: user.apellidoPaterno,
      apellidoMaterno: user.apellidoMaterno,
      isActive: user.isActive,
      desactivedAt: user.desactivedAt,
    };
  }
}
