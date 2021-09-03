import { getCustomRepository } from 'typeorm';

import { PerformanceRepositories } from '../../repositories/PerformanceRepositories';

import { ListPerformanceService } from './ListPerformanceService';

interface IPerformanceRequest {
  user_id: string;
  value: number;
  data_to_update: 'total_tasks_completed' | 'total_time_work' | 'total_time_rest';
}

class UpdatePerformanceService {
  async execute({
    user_id, value, data_to_update,
  }: IPerformanceRequest) {
    const performancesRepositories = getCustomRepository(PerformanceRepositories);

    // Perfomance exists
    const performanceExists = await performancesRepositories.findOne({ user_id });

    if (!performanceExists) {
      throw new Error('Performance not exists.');
    }

    // Verify and update performance
    switch (data_to_update) {
      case 'total_tasks_completed':
        await performancesRepositories.update(
          { user_id },
          { total_tasks_completed: performanceExists.total_tasks_completed + value },
        );
        break;

      case 'total_time_work':
        await performancesRepositories.update(
          { user_id },
          { total_time_work: performanceExists.total_time_work + value },
        );
        break;

      case 'total_time_rest':
        await performancesRepositories.update(
          { user_id },
          { total_time_rest: performanceExists.total_time_rest + value },
        );
        break;

      default:
        throw new Error('Type data not found.');
    }

    // List performance
    const listPerformanceService = new ListPerformanceService();
    const performance = await listPerformanceService.execute(user_id);

    return performance;
  }
}

export { UpdatePerformanceService };
