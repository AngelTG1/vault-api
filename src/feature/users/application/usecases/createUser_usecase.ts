import { IUsersRepository } from '../../domain/repository/users_repository';
import { User } from '../../domain/entity/user';
import { createHash } from 'crypto';

export class CreateUserUsecase {
  constructor(private repo: IUsersRepository) {}

  async execute({ userName, password, email }: { userName: string; password: string, email: string }) {
    const existing = await this.repo.findByUsername(userName);
    if (existing) throw new Error('Username already exists');

    const hashMethod = 'SHA1';
    const hash = createHash('sha1').update(password).digest('hex');
    const user = new User({ userName, passwordHash: hash, hashMethod, email });

    await this.repo.create(user);

    return { userName: user.userName, hashMethod: user.hashMethod, email: user.email};
  }
}
