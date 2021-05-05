import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationTaskUser1620184377900 implements MigrationInterface {
    name = 'RelationTaskUser1620184377900'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "temporary_tasks" ("id" uuid PRIMARY KEY NOT NULL, "title" varchar(30) NOT NULL, "is_completed" boolean NOT NULL DEFAULT (false), "created_at" timestamps NOT NULL DEFAULT (now()), "userId" varchar)');
      await queryRunner.query('INSERT INTO "temporary_tasks"("id", "title", "is_completed", "created_at") SELECT "id", "title", "is_completed", "created_at" FROM "tasks"');
      await queryRunner.query('DROP TABLE "tasks"');
      await queryRunner.query('ALTER TABLE "temporary_tasks" RENAME TO "tasks"');
      await queryRunner.query('CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime(\'now\')), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))');
      await queryRunner.query('INSERT INTO "temporary_users"("id", "email", "password", "created_at") SELECT "id", "email", "password", "created_at" FROM "users"');
      await queryRunner.query('DROP TABLE "users"');
      await queryRunner.query('ALTER TABLE "temporary_users" RENAME TO "users"');
      await queryRunner.query('CREATE TABLE "temporary_tasks" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "is_completed" boolean NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime(\'now\')), "userId" varchar)');
      await queryRunner.query('INSERT INTO "temporary_tasks"("id", "title", "is_completed", "created_at", "userId") SELECT "id", "title", "is_completed", "created_at", "userId" FROM "tasks"');
      await queryRunner.query('DROP TABLE "tasks"');
      await queryRunner.query('ALTER TABLE "temporary_tasks" RENAME TO "tasks"');
      await queryRunner.query('CREATE TABLE "temporary_tasks" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "is_completed" boolean NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime(\'now\')), "userId" varchar, CONSTRAINT "FK_166bd96559cb38595d392f75a35" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)');
      await queryRunner.query('INSERT INTO "temporary_tasks"("id", "title", "is_completed", "created_at", "userId") SELECT "id", "title", "is_completed", "created_at", "userId" FROM "tasks"');
      await queryRunner.query('DROP TABLE "tasks"');
      await queryRunner.query('ALTER TABLE "temporary_tasks" RENAME TO "tasks"');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "tasks" RENAME TO "temporary_tasks"');
      await queryRunner.query('CREATE TABLE "tasks" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "is_completed" boolean NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime(\'now\')), "userId" varchar)');
      await queryRunner.query('INSERT INTO "tasks"("id", "title", "is_completed", "created_at", "userId") SELECT "id", "title", "is_completed", "created_at", "userId" FROM "temporary_tasks"');
      await queryRunner.query('DROP TABLE "temporary_tasks"');
      await queryRunner.query('ALTER TABLE "tasks" RENAME TO "temporary_tasks"');
      await queryRunner.query('CREATE TABLE "tasks" ("id" uuid PRIMARY KEY NOT NULL, "title" varchar(30) NOT NULL, "is_completed" boolean NOT NULL DEFAULT (false), "created_at" timestamps NOT NULL DEFAULT (now()), "userId" varchar)');
      await queryRunner.query('INSERT INTO "tasks"("id", "title", "is_completed", "created_at", "userId") SELECT "id", "title", "is_completed", "created_at", "userId" FROM "temporary_tasks"');
      await queryRunner.query('DROP TABLE "temporary_tasks"');
      await queryRunner.query('ALTER TABLE "users" RENAME TO "temporary_users"');
      await queryRunner.query('CREATE TABLE "users" ("id" uuid PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" timestamps NOT NULL DEFAULT (now()), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))');
      await queryRunner.query('INSERT INTO "users"("id", "email", "password", "created_at") SELECT "id", "email", "password", "created_at" FROM "temporary_users"');
      await queryRunner.query('DROP TABLE "temporary_users"');
      await queryRunner.query('ALTER TABLE "tasks" RENAME TO "temporary_tasks"');
      await queryRunner.query('CREATE TABLE "tasks" ("id" uuid PRIMARY KEY NOT NULL, "title" varchar(30) NOT NULL, "is_completed" boolean NOT NULL DEFAULT (false), "created_at" timestamps NOT NULL DEFAULT (now()))');
      await queryRunner.query('INSERT INTO "tasks"("id", "title", "is_completed", "created_at") SELECT "id", "title", "is_completed", "created_at" FROM "temporary_tasks"');
      await queryRunner.query('DROP TABLE "temporary_tasks"');
    }
}
