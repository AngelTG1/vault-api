import { Router } from 'express';
import { isConnected } from './db';

const router = Router();

router.get('/health', (req, res) => {
  if (isConnected()) {
    return res.status(200).json({ status: 'ok api v1', db: 'up' });
  }
  return res.status(503).json({ status: 'degraded', db: 'down' });
});

export default router;
