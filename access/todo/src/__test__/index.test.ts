import { createConnection } from '@access/common'
import { integrationConnectionConfig } from '@access/common/config/integration'
import { TodoAccess } from '..'
import { ITodoAccess } from '../types'

describe('TodoAccess', () => {
  let todoAccess: ITodoAccess

  beforeAll(async () => {
    const connection = await createConnection(integrationConnectionConfig)
    todoAccess = TodoAccess(connection)
    await todoAccess.remove({})
  })

  afterEach(async () => {
    await todoAccess.remove({})
  })

  test('should be able to store and query for a todo by ID', async () => {
    const testTodo = {
      id: 1,
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
      id: 2,
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
      id: 1,
      text: 'Match',
      done: false,
    })
    await todoAccess.store({
      id: 2,
      text: 'No',
      done: false,
    })
    await todoAccess.store({
      id: 3,
      text: 'Match',
      done: false,
    })

    expect(await todoAccess.count({ text: 'Match' })).toBe(2)
  })
})
