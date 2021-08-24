import { getCustomRepository } from 'typeorm';

import { TasksRepositories } from '../../repositories/TasksRepositories';

class ListTasksServices {
  async execute(user_id: string) {
    const tasksRepositories = getCustomRepository(TasksRepositories);

    // Get tasks
    const tasks = await tasksRepositories.find({ user_id });

    // Format tasks
    tasks.map((item) => {
      delete item.user_id;
      delete item.updated_at;
      delete item.created_at;
    });

    return tasks;
  }
}

export { ListTasksServices };
