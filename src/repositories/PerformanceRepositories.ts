import { EntityRepository, Repository } from 'typeorm';

import { Performance } from '../entities/Performance';

@EntityRepository(Performance)
export class PerformanceRepositories extends Repository<Performance> { }
