import { Request, Response } from 'express';
import { getUsersUsecase } from '../dependence';

export async function getUsersController(req: Request, res: Response) {
  try {
    const users = await getUsersUsecase.execute();
    return res.status(200).json(users);
  } catch (err: any) {
    return res.status(400).json({ message: err.message || 'Error' });
  }
}
