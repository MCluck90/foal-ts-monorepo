import { MigrationInterface, QueryRunner } from 'typeorm'
import { stripIndentation } from '@utility/common/string'

export class Init1625265457689 implements MigrationInterface {
  name = 'Init1625265457689'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(stripIndentation`
      CREATE TABLE "todo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" varchar NOT NULL, "done" boolean NOT NULL)
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "todo"`)
  }
}
