import { Connection } from 'typeorm'
import { createConnection } from '..'
import { integrationConnectionConfig } from '../config/integration'
import { Todo } from '../entity/todo'

describe('Todo', () => {
  let connection: Connection

  beforeAll(async () => {
    connection = await createConnection(integrationConnectionConfig)
  })

  afterEach(async () => {
    await connection.close()
  })

  test('should be able to save and return a todo item', async () => {
    const testTodo = {
      id: 'test-id',
      text: 'Test',
      done: true,
    }
    const insertResult = await connection.getRepository(Todo).insert(testTodo)

    expect(insertResult.identifiers[0].id).toBe(testTodo.id)

    const todoItem = await connection
      .getRepository(Todo)
      .createQueryBuilder()
      .where('id = :id', { id: testTodo.id })
      .getOne()

    expect(todoItem).toEqual(testTodo)
  })
})
