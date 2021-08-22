import { EntityRepository, Repository } from 'typeorm';

import { Users } from '../entities/User';

@EntityRepository(Users)
export class UsersRepositories extends Repository<Users> { }
