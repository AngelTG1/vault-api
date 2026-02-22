import { MySQLUsersRepositoryImpl } from './db/MySQLUsersRepositoryImpl';
import { CreateUserUsecase } from '../application/usecases/createUser_usecase';
import { GetUsersUsecase } from '../application/usecases/getUsers_usecase';
import { ActivateUserUsecase } from '../application/usecases/activateUser_usecase';
import { DeactivateUserUsecase } from '../application/usecases/deactivateUser_usecase';

// Singletons / wiring for the Users feature
const usersRepository = new MySQLUsersRepositoryImpl();

const createUserUsecase = new CreateUserUsecase(usersRepository);
const getUsersUsecase = new GetUsersUsecase(usersRepository);
const activateUserUsecase = new ActivateUserUsecase(usersRepository);
const deactivateUserUsecase = new DeactivateUserUsecase(usersRepository);

export { usersRepository, createUserUsecase, getUsersUsecase, activateUserUsecase, deactivateUserUsecase };
