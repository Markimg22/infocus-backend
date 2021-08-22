import { EntityRepository, Repository } from 'typeorm';

import { Tasks } from '../entities/Tasks';

@EntityRepository(Tasks)
export class TasksRepositories extends Repository<Tasks> { }
