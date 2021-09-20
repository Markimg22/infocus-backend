import { getConnection } from 'typeorm';

import { TasksRepositories } from '../../repositories/TasksRepositories';

import { alphabeticalOrderComparison } from '../../utils/alphabetical-order-comparison';

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

    // Order list tasks
    const sortTasks = tasks.sort(alphabeticalOrderComparison);

    return sortTasks;
  }
}

export { ListTasksService };
