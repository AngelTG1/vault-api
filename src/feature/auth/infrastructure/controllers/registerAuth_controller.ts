import { Request, Response } from 'express';
import { registerAuthUsecase } from '../dependence';

export async function registerAuthController(req: Request, res: Response) {
  try {
    const { username, email, password, isAdmin } = req.body;
    const result = await registerAuthUsecase.execute({ username, email, password, isAdmin });
    return res.status(201).json(result);
  } catch (err: any) {
    return res.status(400).json({ message: err.message || 'Error' });
  }
}
