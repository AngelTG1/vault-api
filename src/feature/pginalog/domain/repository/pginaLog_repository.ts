import { PginaLog } from '../entity/pginaLog';

export interface IPginaLogRepository {
  findAll(): Promise<PginaLog[]>;
}
