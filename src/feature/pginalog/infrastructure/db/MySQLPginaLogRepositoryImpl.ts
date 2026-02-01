import { IPginaLogRepository } from '../../domain/repository/pginaLog_repository';
import { PginaLog } from '../../domain/entity/pginaLog';
import { query } from '../../../../core/db';

export class MySQLPginaLogRepositoryImpl implements IPginaLogRepository {
  async findAll(): Promise<PginaLog[]> {
    const rows = await query('SELECT TimeStamp, Host, Ip, Machine, Message FROM pginalog ORDER BY TimeStamp DESC');
    return rows
      .map((row: any) => PginaLog.fromRow(row))
      .filter((item): item is PginaLog => item !== null);
  }
}
