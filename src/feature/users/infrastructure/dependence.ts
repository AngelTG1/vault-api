import { MySQLUsersRepositoryImpl } from './db/MySQLUsersRepositoryImpl';
import { CreateUserUsecase } from '../application/usecases/createUser_usecase';
import { GetUsersUsecase } from '../application/usecases/getUsers_usecase';

// Singletons / wiring for the Users feature
const usersRepository = new MySQLUsersRepositoryImpl();

const createUserUsecase = new CreateUserUsecase(usersRepository);
const getUsersUsecase = new GetUsersUsecase(usersRepository);

export { usersRepository, createUserUsecase, getUsersUsecase };
