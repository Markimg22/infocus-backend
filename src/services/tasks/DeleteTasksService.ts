import { getConnection } from 'typeorm';

import { TasksRepositories } from '../../repositories/TasksRepositories';

import { ListTasksService } from './ListTasksService';

interface ITasksRequest {
  task_id: string;
  user_id: string;
}

class DeleteTasksService {
  async execute({ task_id, user_id }: ITasksRequest) {
    const tasksRepositories = getConnection(process.env.NODE_ENV).getCustomRepository(TasksRepositories);

    // Task exists
    const task = await tasksRepositories.findOne({ user_id, id: task_id });

    if (!task) {
      throw new Error('Task not exists.');
    }

    // Remove task
    await tasksRepositories.remove(task);

    // List tasks
    const listTasksService = new ListTasksService();
    const tasks = await listTasksService.execute(user_id);

    return tasks;
  }
}

export { DeleteTasksService };
