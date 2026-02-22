import { Request, Response } from 'express';
import { deactivateUserUsecase } from '../dependence';

export async function deactivateUserController(req: Request, res: Response) {
  try {
    const userId = Number(req.params.userId);
    if (!Number.isInteger(userId)) throw new Error('Invalid userId');

    const result = await deactivateUserUsecase.execute(userId);
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(400).json({ message: err.message || 'Error' });
  }
}
