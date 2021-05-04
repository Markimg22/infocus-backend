import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1620098680458 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'tasks_id',
            type: 'uuid',
            isNullable: true,
            isArray: true,
          },
          {
            name: 'created_at',
            type: 'timestamps',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKTask',
            referencedTableName: 'tasks',
            referencedColumnNames: ['id'],
            columnNames: ['tasks_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
