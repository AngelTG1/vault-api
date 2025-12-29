import { MySQLUsersRepositoryImpl } from './db/MySQLUsersRepositoryImpl';
import { CreateUserUsecase } from '../application/usecases/createUser_usecase';

// Singletons / wiring for the Users feature
const usersRepository = new MySQLUsersRepositoryImpl();

const createUserUsecase = new CreateUserUsecase(usersRepository);

export { usersRepository, createUserUsecase };
