import { getCustomRepository } from 'typeorm';

import { PerformanceRepositories } from '../../repositories/PerformanceRepositories';

class DeletePerformanceServices {
  async execute(user_id: string) {
    const performanceRepositories = getCustomRepository(PerformanceRepositories);

    // Performance exists
    const performance = await performanceRepositories.findOne({ user_id });

    if (!performance) {
      throw new Error('Performance not exists.');
    }

    // Remove performance
    await performanceRepositories.remove(performance);

    return 'Deleted performance.';
  }
}

export { DeletePerformanceServices };
