import { MySQLAuthRepositoryImpl } from './db/MySQLAuthRepositoryImpl';
import { RegisterAuthUsecase } from './../application/usecases/registerAuth_usecase';
import { LoginAuthUsecase } from './../application/usecases/loginAuth_usecase';
import { bcryptService } from './../application/services/bcryptService';
import { jwtService } from './../application/services/jwtService';

// Singletons / wiring for the Auth feature
const authRepository = new MySQLAuthRepositoryImpl();

const registerAuthUsecase = new RegisterAuthUsecase(authRepository);
const loginAuthUsecase = new LoginAuthUsecase(authRepository);

export { 
    authRepository, 
    registerAuthUsecase, 
    loginAuthUsecase, 
    bcryptService, 
    jwtService 
};
