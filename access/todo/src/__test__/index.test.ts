import { Connection, createConnection } from '@access/common'
import { integrationConnectionConfig } from '@access/common/config/integration'
import { TodoAccess } from '..'
import { ITodoAccess } from '../types'

describe('TodoAccess', () => {
  let todoAccess: ITodoAccess
  let connection: Connection

  beforeEach(async () => {
    connection = await createConnection(integrationConnectionConfig)
    todoAccess = TodoAccess(connection)
  })

  afterEach(async () => {
    await connection.close()
  })

  test('should be able to store and query for a todo by ID', async () => {
    const testTodo = {
      id: 'test-a',
      text: 'Test',
      done: true,
    }

    await todoAccess.store(testTodo)
    const todos = await todoAccess.query({ id: testTodo.id })
    expect(todos).toHaveLength(1)
    expect(todos[0]).toEqual(testTodo)
  })

  test('should be able to remove a todo by ID', async () => {
    const testTodo = {
      id: 'test-a',
      text: 'Test 2',
      done: false,
    }

    await todoAccess.store(testTodo)
    let todos = await todoAccess.query({ id: testTodo.id })
    expect(todos).toHaveLength(1)

    await todoAccess.remove({ id: testTodo.id })
    todos = await todoAccess.query({ id: testTodo.id })
    expect(todos).toHaveLength(0)
  })

  test('should be able to count the number of todos that have some text', async () => {
    await todoAccess.store({
      id: 'test-a',
      text: 'Match',
      done: false,
    })
    await todoAccess.store({
      id: 'test-b',
      text: 'No',
      done: false,
    })
    await todoAccess.store({
      id: 'test-c',
      text: 'Match',
      done: false,
    })

    expect(await todoAccess.count({ text: 'Match' })).toBe(2)
  })
})
