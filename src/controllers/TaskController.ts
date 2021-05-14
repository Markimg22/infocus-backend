import { Request, Response } from 'express';

import { UserModel } from '../models/User';

class TaskController {
  async store(req: Request, res: Response) {
    try {
      const { title } = req.body;

      const user = await UserModel.findOne({ id: req.userId });
      user.tasks.push(title);

      await user.save();

      return res.json(user.tasks);
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const user = await UserModel.findOne({ id: req.userId });

      return res.json(user.tasks);
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await UserModel.findOne({ id: req.userId });
      user.tasks = user.tasks.filter((task) => task.id !== id);

      await user.save();

      return res.json(user.tasks);
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await UserModel.findOne({ id: req.userId });

      user.tasks.filter((task) => {
        if (task.id === id) {
          // eslint-disable-next-line no-param-reassign
          task.isCompleted = !task.isCompleted;
        }

        return user.tasks;
      });

      await user.save();

      return res.json(user.tasks);
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }
}

export default new TaskController();
