import { getConnection } from 'typeorm';

import { PerformanceRepositories } from '../../repositories/PerformanceRepositories';

class ListPerformanceService {
  async execute(user_id: string) {
    const performanceRepositories = getConnection(process.env.NODE_ENV).getCustomRepository(PerformanceRepositories);

    const performance = await performanceRepositories.findOne({ user_id });

    if (!performance) {
      throw new Error('Performance not exists.');
    }

    // @ts-expect-error
    delete performance.id;
    delete performance.user_id;
    delete performance.created_at;
    delete performance.updated_at;

    return performance;
  }
}

export { ListPerformanceService };
