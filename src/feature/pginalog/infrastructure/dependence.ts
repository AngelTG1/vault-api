import { MySQLPginaLogRepositoryImpl } from './db/MySQLPginaLogRepositoryImpl';
import { GetPginaLogUsecase } from '../application/usecases/getPginaLog_usecase';

const pginaLogRepository = new MySQLPginaLogRepositoryImpl();
const getPginaLogUsecase = new GetPginaLogUsecase(pginaLogRepository);

export { pginaLogRepository, getPginaLogUsecase };
