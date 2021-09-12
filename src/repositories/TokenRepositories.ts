import { EntityRepository, Repository } from 'typeorm';

import { Token } from '../entities/Token';

@EntityRepository(Token)
export class TokenRepositories extends Repository<Token> { }
