import { getConnection } from 'typeorm';

import { TasksRepositories } from '../../repositories/TasksRepositories';

class ListTasksService {
  async execute(user_id: string) {
    const tasksRepositories = getConnection(process.env.NODE_ENV).getCustomRepository(TasksRepositories);

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

export { ListTasksService };
