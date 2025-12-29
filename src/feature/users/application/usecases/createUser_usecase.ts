import { IUsersRepository } from '../../domain/repository/users_repository';
import { User } from '../../domain/entity/user';
import { bcryptService } from '../../../auth/application/services/bcryptService';
import { v4 as uuidv4 } from 'uuid';

export class CreateUserUsecase {
  constructor(private repo: IUsersRepository) {}

  async execute({ userName, password }: { userName: string; password: string }) {
    const existing = await this.repo.findByUsername(userName);
    if (existing) throw new Error('Username already exists');

    const hash = await bcryptService.hash(password);
    const user = new User({ userName, passwordHash: hash, hashMethod: 'bcrypt' });

    await this.repo.create(user);

    return { userName: user.userName, hashMethod: user.hashMethod };
  }
}
