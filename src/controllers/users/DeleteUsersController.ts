import { Request, Response } from 'express';

import { DeleteUsersService } from '../../services/users/DeleteUsersService';
import { DeletePerformanceService } from '../../services/performances/DeletePerformanceService';
import { DeleteTasksService } from '../../services/tasks/DeleteTasksService';

import { ListTasksService } from '../../services/tasks/ListTasksService';

class DeleteUsersController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    // Delete tasks
    const listTasksService = new ListTasksService();
    const deleteTasksService = new DeleteTasksService();

    const tasks = await listTasksService.execute(user_id);

    tasks.map(async (task) => {
      await deleteTasksService.execute({ task_id: task.id, user_id });
    });

    // Delete performance
    const deletePerformanceService = new DeletePerformanceService();
    await deletePerformanceService.execute(user_id);

    // Delete user
    const deleteUsersService = new DeleteUsersService();
    const resultDeleteUser = await deleteUsersService.execute(user_id);

    return res.json({ message: resultDeleteUser });
  }
}

export default new DeleteUsersController();
