import { getCustomRepository } from 'typeorm';

import { TasksRepositories } from '../repositories/TasksRepositories';

export class ListTasksServices {
  async execute(user_id: string) {
    const tasksRepositories = getCustomRepository(TasksRepositories);

    // Get tasks
    const tasks = await tasksRepositories.find({ user_id });

    // Filter tasks
    const filterTasks = [];
    tasks.map((item) => {
      delete item.user_id;
      delete item.updated_at;
      delete item.created_at;

      filterTasks.push(item);
    });

    return filterTasks;
  }
}
