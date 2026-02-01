import { IPginaLogRepository } from '../../domain/repository/pginaLog_repository';

export class GetPginaLogUsecase {
  constructor(private repo: IPginaLogRepository) {}

  async execute() {
    const entries = await this.repo.findAll();
    return entries.map((item) => item.toPrimitives());
  }
}
