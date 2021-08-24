import { getCustomRepository } from 'typeorm';

import { TasksRepositories } from '../../repositories/TasksRepositories';

interface ITasksRequest {
  task_id: string;
  user_id: string;
}

export class UpdateTasksServices {
  async execute({ task_id, user_id }: ITasksRequest) {
    const tasksRepositories = getCustomRepository(TasksRepositories);

    // Task exists
    const task = await tasksRepositories.findOne({ user_id, id: task_id });

    if (!task) {
      throw new Error('Task not exists.');
    }

    // Update task
    await tasksRepositories.update({ id: task.id }, { is_completed: !task.is_completed });

    return 'Updated task';
  }
}
