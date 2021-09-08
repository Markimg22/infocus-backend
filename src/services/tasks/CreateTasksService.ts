import { getConnection } from 'typeorm';

import { TasksRepositories } from '../../repositories/TasksRepositories';

import { ListTasksService } from './ListTasksService';

interface ITasksRequest {
  title: string;
  is_completed: boolean,
  user_id: string;
}

class CreateTasksService {
  async execute({ title, is_completed, user_id }: ITasksRequest) {
    const tasksRepositories = getConnection(process.env.NODE_ENV).getCustomRepository(TasksRepositories);

    // Validate fields
    if (!title) {
      throw new Error('Name task is required.');
    }

    // Create and save task
    const task = tasksRepositories.create({
      title,
      is_completed,
      user_id,
    });

    await tasksRepositories.save(task);

    // List tasks
    const listTasksService = new ListTasksService();
    const tasks = await listTasksService.execute(user_id);

    return tasks;
  }
}

export { CreateTasksService };
