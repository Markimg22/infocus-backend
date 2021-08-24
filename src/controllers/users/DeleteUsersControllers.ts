import { Request, Response } from 'express';

import { DeleteUsersServices } from '../../services/users/DeleteUsersServices';
import { DeletePerformanceServices } from '../../services/performances/DeletePerformanceServices';
import { DeleteTasksServices } from '../../services/tasks/DeleteTasksServices';

import { ListTasksServices } from '../../services/tasks/ListTasksServices';

class DeleteUsersControllers {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    // Delete tasks
    const listTasksServices = new ListTasksServices();
    const deleteTasksServices = new DeleteTasksServices();

    const tasks = await listTasksServices.execute(user_id);

    let resultDeleteTasks = '';
    tasks.map(async (task) => {
      resultDeleteTasks = await deleteTasksServices.execute({ task_id: task.id, user_id });
    });

    // Delete performance
    const deletePerformanceServices = new DeletePerformanceServices();
    const resultDeletePerformance = await deletePerformanceServices.execute(user_id);

    // Delete user
    const deleteUsersServices = new DeleteUsersServices();
    const resultDeleteUser = await deleteUsersServices.execute(user_id);

    return res.json({
      tasks: resultDeleteTasks,
      performance: resultDeletePerformance,
      user: resultDeleteUser,
    });
  }
}

export default new DeleteUsersControllers();
