import 'reflect-metadata';
import { getCustomRepository, createConnection, getConnection } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';

describe('User', () => {
  // Create
  beforeAll(async () => {
    await createConnection().then(() => {
      console.log('📦 Connected to database test.');
    }).catch((error) => {
      console.error(`Error connected database test: ${error}.`);
    });
  });

  // Close
  afterEach(async () => {
    await getConnection().close().then(() => {
      console.log('🚫 Finished database connection.');
    }).catch((error) => {
      console.error(`Error finished connection: ${error}.`);
    });
  });

  // Clear
  beforeEach(() => {
    const entities = getConnection().entityMetadatas;
    entities.forEach(async (entity) => {
      const repository = getConnection().getRepository(entity.name);
      await repository.query(`DROP FROM ${entity.tableName}`);
    });
  });

  it('should create user',
    async () => {
      const usersRepositories = getCustomRepository(UsersRepositories);
      const user = usersRepositories.create({
        name: 'Marcos',
        email: 'marcos@hotmail.com',
        password: '12345',
      });

      await usersRepositories.save(user);
      console.log(user);

      expect(user.email).toBe('marcos@hotmail.com');
    });
});
