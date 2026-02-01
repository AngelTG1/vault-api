import { Router } from 'express';
import { dbRequiredMiddleware } from '../../../../core/middleware/dbRequiredMiddleware';
import { adminOnlyMiddleware } from '../../../auth/infrastructure/middleware/adminOnlyMiddleware';
import { getPginaLogController } from '../controllers/getPginaLog_controller';

const router = Router();

router.use(dbRequiredMiddleware);

// Only admins can view pGina log entries
router.get('/', adminOnlyMiddleware, getPginaLogController);

export default router;
