import { EntityRepository, Repository } from 'typeorm';

import { RefreshToken } from '../entities/RefreshToken';

@EntityRepository(RefreshToken)
export class RefreshTokenRepositories extends Repository<RefreshToken> { }
