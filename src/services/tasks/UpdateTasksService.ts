import { getCustomRepository } from 'typeorm';

import { TasksRepositories } from '../../repositories/TasksRepositories';

import { ListTasksService } from './ListTasksService';

interface ITasksRequest {
  task_id: string;
  user_id: string;
}

class UpdateTasksService {
  async execute({ task_id, user_id }: ITasksRequest) {
    const tasksRepositories = getCustomRepository(TasksRepositories);

    // Task exists
    const task = await tasksRepositories.findOne({ user_id, id: task_id });

    if (!task) {
      throw new Error('Task not exists.');
    }

    // Update task
    await tasksRepositories.update({ id: task.id }, { is_completed: !task.is_completed });

    // List tasks
    const listTasksService = new ListTasksService();
    const tasks = await listTasksService.execute(user_id);

    return tasks;
  }
}

export { UpdateTasksService };
