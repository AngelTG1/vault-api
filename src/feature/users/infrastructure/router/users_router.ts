import { Router } from 'express';
import { createUserController } from '../controllers/createUser_controller';
import { getUsersController } from '../controllers/getUsers_controller';
import { activateUserController } from '../controllers/activateUser_controller';
import { deactivateUserController } from '../controllers/deactivateUser_controller';
import { adminOnlyMiddleware } from '../../../auth/infrastructure/middleware/adminOnlyMiddleware';
import { dbRequiredMiddleware } from '../../../../core/middleware/dbRequiredMiddleware';

const router = Router();

router.use(dbRequiredMiddleware);

// List users (admin only)
router.get('/', adminOnlyMiddleware, getUsersController);

// Only admins can create users
router.post('/create', adminOnlyMiddleware, createUserController);

// Activate / deactivate users
router.patch('/:userId/activate', adminOnlyMiddleware, activateUserController);
router.patch('/:userId/deactivate', adminOnlyMiddleware, deactivateUserController);

export default router;
