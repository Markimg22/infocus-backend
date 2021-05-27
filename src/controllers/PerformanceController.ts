import { Request, Response } from 'express';

import { UserModel, Performance } from '../models/User';

class PerformanceController {
  async show(req: Request, res: Response) {
    try {
      const user = await UserModel.findById(req.userId);
      return res.json(user.performance as Performance);
    } catch (e) {
      return res.status(400).json({
        errors: 'Houve um erro ao obter a performance',
      });
    }
  }

  async updateTotalTasksCompleted(req: Request, res: Response) {
    try {
      const { value } = req.body;
      const user = await UserModel.findById(req.userId);

      user.performance.totalTasksCompleted += value;
      await user.save();

      return res.json(user.performance as Performance);
    } catch (e) {
      return res.status(400).json({
        errors: 'Houve um erro ao atualizar o número total de tarefas completadas',
      });
    }
  }

  async updateTotalWorkingTime(req: Request, res: Response) {
    try {
      const { value } = req.body;
      const user = await UserModel.findById(req.userId);

      user.performance.totalWorkingTime += value;

      await user.save();

      return res.json(user.performance as Performance);
    } catch (e) {
      return res.status(400).json({
        errors: 'Houve um erro ao atualizar tempo total de trabalho',
      });
    }
  }

  async updateTotalRestTime(req: Request, res: Response) {
    try {
      const { value } = req.body;
      const user = await UserModel.findById(req.userId);

      user.performance.totalRestTime += value;

      await user.save();

      return res.json(user.performance as Performance);
    } catch (e) {
      return res.status(400).json({
        errors: 'Houve um erro ao atualizar tempo total de descanso',
      });
    }
  }
}

export default new PerformanceController();
