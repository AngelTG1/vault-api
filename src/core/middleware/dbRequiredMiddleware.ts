import { Request, Response, NextFunction } from 'express';
import { isConnected } from '../db';

export function dbRequiredMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!isConnected()) {
    return res.status(503).json({ message: 'Servicio temporalmente no disponible - Base de datos desconectada' });
  }
  next();
}
