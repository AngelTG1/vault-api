import { Request, Response } from 'express';
import { activateUserUsecase } from '../dependence';

export async function activateUserController(req: Request, res: Response) {
  try {
    const userId = Number(req.params.userId);
    if (!Number.isInteger(userId)) throw new Error('Invalid userId');

    const result = await activateUserUsecase.execute(userId);
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(400).json({ message: err.message || 'Error' });
  }
}
