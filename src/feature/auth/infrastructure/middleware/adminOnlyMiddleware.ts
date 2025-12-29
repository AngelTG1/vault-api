import { Request, Response, NextFunction } from 'express';
import { jwtService } from '../../application/services/jwtService';

export async function adminOnlyMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Missing Authorization' });

    const [, token] = authHeader.split(' ');
    if (!token) return res.status(401).json({ message: 'Invalid Authorization' });

    const payload: any = jwtService.verify(token);
    if (!payload || !payload.isAdmin) return res.status(403).json({ message: 'Admin only' });

    // attach user id and role
    (req as any).user = { id: payload.sub, username: payload.username, isAdmin: payload.isAdmin };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
