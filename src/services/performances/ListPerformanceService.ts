import { getCustomRepository } from 'typeorm';

import { PerformanceRepositories } from '../../repositories/PerformanceRepositories';

class ListPerformanceService {
  async execute(user_id: string) {
    const performanceRepositories = getCustomRepository(PerformanceRepositories);

    const performance = await performanceRepositories.findOne({ user_id });

    if (!performance) {
      throw new Error('Performance not exists.');
    }

    delete performance.user_id;
    delete performance.created_at;
    delete performance.updated_at;

    return performance;
  }
}

export { ListPerformanceService };
