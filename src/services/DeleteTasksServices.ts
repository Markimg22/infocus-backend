import { getCustomRepository } from 'typeorm';

import { TasksRepositories } from '../repositories/TasksRepositories';

interface ITasksRequest {
  task_id: string;
  user_id: string;
}

export class DeleteTasksServices {
  async execute({ task_id, user_id }: ITasksRequest) {
    const tasksRepositories = getCustomRepository(TasksRepositories);

    // task exists
    const task = await tasksRepositories.findOne({ user_id, id: task_id });

    if (!task) {
      throw new Error('Task not exists');
    }

    await tasksRepositories.remove(task);

    return 'Deleted task.';
  }
}
