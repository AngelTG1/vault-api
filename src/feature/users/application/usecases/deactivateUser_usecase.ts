import { IUsersRepository } from '../../domain/repository/users_repository';

export class DeactivateUserUsecase {
  constructor(private repo: IUsersRepository) {}

  async execute(userId: number) {
    const user = await this.repo.findById(userId);
    if (!user) throw new Error('User not found');

    user.deactivate();
    await this.repo.updateActivation(userId, user.isActive, user.desactivedAt);

    return { userId: user.userId, isActive: user.isActive, desactivedAt: user.desactivedAt };
  }
}
