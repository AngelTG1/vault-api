import { Router } from 'express';
import { createUserController } from '../controllers/createUser_controller';
import { adminOnlyMiddleware } from '../../../auth/infrastructure/middleware/adminOnlyMiddleware';
import { dbRequiredMiddleware } from '../../../../core/middleware/dbRequiredMiddleware';

const router = Router();

router.use(dbRequiredMiddleware);

// Only admins can create users
router.post('/create', adminOnlyMiddleware, createUserController);

export default router;
