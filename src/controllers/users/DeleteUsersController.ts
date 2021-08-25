import { Request, Response } from 'express';

import { DeleteUsersService } from '../../services/users/DeleteUsersService';
import { DeletePerformanceService } from '../../services/performances/DeletePerformanceService';
import { DeleteTasksService } from '../../services/tasks/DeleteTasksService';

import { ListTasksService } from '../../services/tasks/ListTasksService';

class DeleteUsersController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    // Delete tasks
    const listTasksServices = new ListTasksService();
    const deleteTasksServices = new DeleteTasksService();

    const tasks = await listTasksServices.execute(user_id);

    let resultDeleteTasks = '';
    tasks.map(async (task) => {
      resultDeleteTasks = await deleteTasksServices.execute({ task_id: task.id, user_id });
    });

    // Delete performance
    const deletePerformanceServices = new DeletePerformanceService();
    const resultDeletePerformance = await deletePerformanceServices.execute(user_id);

    // Delete user
    const deleteUsersServices = new DeleteUsersService();
    const resultDeleteUser = await deleteUsersServices.execute(user_id);

    return res.json({
      tasks: resultDeleteTasks,
      performance: resultDeletePerformance,
      user: resultDeleteUser,
    });
  }
}

export default new DeleteUsersController();
