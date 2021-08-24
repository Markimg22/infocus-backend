import { getCustomRepository } from 'typeorm';

import { PerformanceRepositories } from '../../repositories/PerformanceRepositories';

export class CreatePerformanceServices {
  async execute(user_id: string) {
    const performanceRepositories = getCustomRepository(PerformanceRepositories);

    // Performance already exists
    const performanceAlreadyExists = await performanceRepositories.findOne({ user_id });

    if (performanceAlreadyExists) {
      throw new Error('Performance already exists.');
    }

    // Create and save performance
    const performance = performanceRepositories.create({ user_id });
    await performanceRepositories.save(performance);

    return performance;
  }
}
