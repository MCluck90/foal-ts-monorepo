import { stripIndentation } from '@utility/common/string'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangeTodoIdToString1625419384428 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('todo', 'todo_old')
    await queryRunner.query(stripIndentation`
    CREATE TABLE todo ("id" string PRIMARY KEY, "text" varchar NOT NULL, "done" boolean NOT NULL)
    `)
    await queryRunner.query(stripIndentation`
    INSERT INTO todo 
      SELECT *
      FROM todo_old
    `)
    await queryRunner.dropTable('todo_old')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('todo', 'todo_old')
    await queryRunner.query(stripIndentation`
    CREATE TABLE todo ("id" integer PRIMARY KEY, "text" varchar NOT NULL, "done" boolean NOT NULL)
    `)
    await queryRunner.query(stripIndentation`
    INSERT INTO todo (
      SELECT *
      FROM todo_old
    )
    `)
    await queryRunner.dropTable('todo_old')
  }
}
