import { getCustomRepository } from 'typeorm';

import { TasksRepositories } from '../repositories/TasksRepositories';

interface ITasksRequest {
  title: string;
  is_completed: boolean,
  user_id: string;
}

export class CreateTasksServices {
  async execute({ title, is_completed, user_id }: ITasksRequest) {
    const tasksRepositories = getCustomRepository(TasksRepositories);

    // Validate fields
    if (!title) {
      throw new Error('Name task is required');
    }

    // Create and save task
    const task = tasksRepositories.create({
      title,
      is_completed,
      user_id,
    });

    await tasksRepositories.save(task);

    return task;
  }
}
