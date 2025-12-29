import { Router } from 'express';
import { loginAuthController } from '../controllers/loginAuth_controller';
import { registerAuthController } from '../controllers/registerAuth_controller';
import { adminOnlyMiddleware } from '../middleware/adminOnlyMiddleware';
import { dbRequiredMiddleware } from '../../../../core/middleware/dbRequiredMiddleware';

const router = Router();

// Require DB for auth endpoints
router.use(dbRequiredMiddleware);

router.post('/login', loginAuthController);
// register is protected: only admins that are already registered can create new users
router.post('/register', adminOnlyMiddleware, registerAuthController);

export default router;
