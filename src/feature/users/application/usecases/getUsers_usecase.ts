import { IUsersRepository } from '../../domain/repository/users_repository';

export class GetUsersUsecase {
  constructor(private repo: IUsersRepository) {}

  async execute() {
    const users = await this.repo.findAll();
    return users.map((user) => ({
      userId: user.userId,
      userName: user.userName,
      hashMethod: user.hashMethod,
      email: user.email,
      name: user.name,
      apellidoPaterno: user.apellidoPaterno,
      apellidoMaterno: user.apellidoMaterno,
      isActive: user.isActive,
      desactivedAt: user.desactivedAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }
}
