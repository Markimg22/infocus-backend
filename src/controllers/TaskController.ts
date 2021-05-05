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
      const { id } = req.body;

      await taskRepository.delete(id);
      const tasks = await taskRepository.find({ where: { user: req.userId } });

      return res.json(tasks);
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const taskRepository = getRepository(Task);
      const { id } = req.body;

      const task = await taskRepository.findOne(id);
      task.is_completed = !task.is_completed;

      await taskRepository.save(task);

      return res.json(task);
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }
}

export default new TaskController();
