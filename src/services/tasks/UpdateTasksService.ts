import { getConnection } from 'typeorm';

import { TasksRepositories } from '../../repositories/TasksRepositories';

import { ListTasksService } from './ListTasksService';
import { UpdatePerformanceService } from '../performances/UpdatePerformanceService';

interface ITasksRequest {
  user_id: string;
  task_id: string;
}

class UpdateTasksService {
  async execute({ user_id, task_id }: ITasksRequest) {
    const tasksRepositories = getConnection(process.env.NODE_ENV).getCustomRepository(TasksRepositories);

    // Task exists
    let task = await tasksRepositories.findOne({ user_id, id: task_id });

    if (!task) {
      throw new Error('Task not exists.');
    }

    // Update task
    await tasksRepositories.update({ id: task.id }, { is_completed: !task.is_completed });

    // Update performance
    const updatePerformanceService = new UpdatePerformanceService();
    task = await tasksRepositories.findOne({ user_id, id: task_id });

    await updatePerformanceService.execute({
      user_id,
      value: task.is_completed ? 1 : -1,
      data_to_update: 'total_tasks_completed',
    });

    // List tasks
    const listTasksService = new ListTasksService();
    const tasks = await listTasksService.execute(user_id);

    return tasks;
  }
}

export { UpdateTasksService };
