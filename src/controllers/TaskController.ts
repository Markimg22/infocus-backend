import { Request, Response } from 'express';

import { UserModel, Task } from '../models/User';

class TaskController {
  async store(req: Request, res: Response) {
    try {
      const { title } = req.body;

      const user = await UserModel.findById(req.userId);
      const taskExits = user.tasks.filter((task) => task.title === title);

      if (taskExits.length !== 0) {
        return res.status(409).json({
          errors: 'Tarefa já existe',
        });
      }

      const task = { title } as Task;
      user.tasks.push(task);

      await user.save();

      return res.json(user.tasks);
    } catch (e) {
      return res.status(400).json({ errors: 'Houve um erro ao criar tarefa' });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const user = await UserModel.findById(req.userId);

      return res.json(user.tasks);
    } catch (e) {
      return res.status(400).json({ errors: 'Houve um erro ao listar tarefas' });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await UserModel.findOneAndUpdate({ 'tasks._id': id }, {
        $pull: {
          tasks: { _id: id },
        },
      });

      const user = await UserModel.findById(req.userId);

      return res.json(user.tasks);
    } catch (e) {
      return res.status(400).json({ errors: 'Houve um erro ao remover tarefa' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { value } = req.body;

      await UserModel.findOneAndUpdate(
        { _id: req.userId, 'tasks._id': id },
        { $set: { 'tasks.$.isCompleted': value } },
      );

      const user = await UserModel.findById(req.userId);

      return res.json(user.tasks);
    } catch (e) {
      return res.status(400).json({ errros: 'Houve ao atualizar tarefa' });
    }
  }
}

export default new TaskController();
