import { Request, Response } from 'express';
import { createUserUsecase } from '../dependence';

export async function createUserController(req: Request, res: Response) {
  try {
    const { userName, password } = req.body;
    const result = await createUserUsecase.execute({ userName, password });
    return res.status(201).json(result);
  } catch (err: any) {
    return res.status(400).json({ message: err.message || 'Error' });
  }
}
