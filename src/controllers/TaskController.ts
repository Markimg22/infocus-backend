import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Task } from '../entities/Task';
import { User } from '../entities/User';

class TaskController {
  async store(req: Request, res: Response) {
    try {
      const taskRepository = getRepository(Task);
      const userRepository = getRepository(User);

      const { title } = req.body;

      const user = await userRepository.findOne({ id: req.userId });
      const task = taskRepository.create({ title, is_completed: false, user });

      delete task.user.password;

      await taskRepository.save(task);

      return res.json(task);
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const taskRepository = getRepository(Task);

      const tasks = await taskRepository.find({ where: { user: req.userId } });

      return res.json(tasks);
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const taskRepository = getRepository(Task);
      // const userRepository = getRepository(User);

      const user = await taskRepository.findOne({ where: { user: req.userId } });
      const tasks = await taskRepository.find({ user });

      return res.json(tasks);
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }
}

export default new TaskController();
