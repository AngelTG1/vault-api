import { Request, Response } from 'express';
import { loginAuthUsecase } from '../dependence';

export async function loginAuthController(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const result = await loginAuthUsecase.execute({ username, password });
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(400).json({ message: err.message || 'Error' });
  }
}
