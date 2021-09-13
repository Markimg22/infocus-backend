import { getConnection } from 'typeorm';

import { UsersRepositories } from '../../repositories/UsersRepositories';

import { DeletePerformanceService } from '../performances/DeletePerformanceService';
import { DeleteTasksService } from '../tasks/DeleteTasksService';
import { DeleteTokenService } from '../tokens/DeleteTokenService';

import { ListTasksService } from '../tasks/ListTasksService';

class DeleteUsersService {
  async execute(user_id: string) {
    const usersRepositories = getConnection(process.env.NODE_ENV).getCustomRepository(UsersRepositories);

    // User exists
    const user = await usersRepositories.findOne({ id: user_id });

    if (!user) {
      throw new Error('User not exists.');
    }

    // Delete tasks
    const listTasksService = new ListTasksService();
    const deleteTaskService = new DeleteTasksService();

    const tasks = await listTasksService.execute(user_id);

    tasks.map(async (task) => {
      await deleteTaskService.execute({ task_id: task.id, user_id });
    });

    // Delete performance
    const deletePerformanceService = new DeletePerformanceService();
    await deletePerformanceService.execute(user_id);

    // Delete token
    const deleteTokenService = new DeleteTokenService();
    await deleteTokenService.execute(user_id);

    // Remove user
    await usersRepositories.remove(user);
  }
}

export { DeleteUsersService };
