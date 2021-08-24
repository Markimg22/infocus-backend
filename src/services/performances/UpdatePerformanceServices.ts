import { getCustomRepository } from 'typeorm';

import { PerformanceRepositories } from '../../repositories/PerformanceRepositories';

interface IPerformanceRequest {
  user_id: string;
  value: number;
  data_to_update: 'total_tasks_completed' | 'total_time_work' | 'total_time_rest';
}

class UpdatePerformanceServices {
  async execute({
    user_id, value, data_to_update,
  }: IPerformanceRequest) {
    const performancesRepositories = getCustomRepository(PerformanceRepositories);

    // Perfomance exists
    const performance = await performancesRepositories.findOne({ user_id });

    if (!performance) {
      throw new Error('Performance not exists.');
    }

    // Verify and update performance
    switch (data_to_update) {
      case 'total_tasks_completed':
        await performancesRepositories.update(
          { user_id },
          { total_tasks_completed: performance.total_tasks_completed + value },
        );
        break;

      case 'total_time_work':
        await performancesRepositories.update(
          { user_id },
          { total_time_work: performance.total_time_work + value },
        );
        break;

      case 'total_time_rest':
        await performancesRepositories.update(
          { user_id },
          { total_time_rest: performance.total_time_rest + value },
        );
        break;

      default:
        throw new Error('Data not found');
    }

    return 'Updated performance.';
  }
}

export { UpdatePerformanceServices };
