import { Request, Response } from 'express';
import { getPginaLogUsecase } from '../dependence';

export async function getPginaLogController(req: Request, res: Response) {
  try {
    const logs = await getPginaLogUsecase.execute();
    return res.status(200).json(logs);
  } catch (err: any) {
    return res.status(400).json({ message: err.message || 'Error' });
  }
}
