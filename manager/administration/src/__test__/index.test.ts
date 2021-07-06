import { Connection, createConnection } from '@access/common'
import { integrationConnectionConfig } from '@access/common/config/integration'
import { ITodoAccess, TodoAccess, TodoDto } from '@access/todo'
import { ValidationEngine } from '@engine/validation'
import { AdministrationManager } from '..'
import { AddTodoDto, IAdministrationManager } from '../types'

describe('AdministrationManager', () => {
  let administrationManager: IAdministrationManager
  let connection: Connection
  let todoAccess: ITodoAccess

  beforeEach(async () => {
    connection = await createConnection(integrationConnectionConfig)
    todoAccess = new TodoAccess(connection)
    const validationEngine = new ValidationEngine()
    administrationManager = new AdministrationManager(
      todoAccess,
      validationEngine,
    )
  })

  afterEach(async () => {
    await connection.close()
  })

  test('should return todos that match a query', async () => {
    const todoWithId: TodoDto = {
      id: 'look-at-this-id',
      text: 'text',
      done: false,
    }

    const todosWithText: TodoDto[] = [
      {
        id: 'abc',
        text: 'Shared text',
        done: false,
      },
      {
        id: 'abc-123',
        text: 'Shared text',
        done: false,
      },
    ]

    const notDoneTodos = [
      todoWithId,
      ...todosWithText,
      {
        id: 'def',
        text: 'Other',
        done: false,
      },
    ]

    const doneTodos = [
      {
        id: 'ghi',
        text: 'ghi',
        done: true,
      },
      {
        id: 'jkl',
        text: 'jkl',
        done: true,
      },
    ]

    for (const todo of notDoneTodos.concat(doneTodos)) {
      await todoAccess.store(todo)
    }

    const byIdResult = await administrationManager.findTodos({
      id: todoWithId.id,
    })
    expect(byIdResult.length).toBe(1)
    expect(byIdResult[0]).toEqual(todoWithId)

    const byTextResult = await administrationManager.findTodos({
      text: 'Shared text',
    })
    expect(byTextResult).toEqual(todosWithText)

    const notDoneResult = await administrationManager.findTodos({
      done: false,
    })
    expect(notDoneResult).toEqual(notDoneTodos)

    const doneResult = await administrationManager.findTodos({
      done: true,
    })
    expect(doneResult).toEqual(doneTodos)
  })

  test('should succeed when adding a new todo', async () => {
    const addTodoDto: AddTodoDto = {
      text: 'Todo',
    }
    const addResult = await administrationManager.addTodo(addTodoDto)
    addResult.match({
      Ok(todo) {
        expect(todo.text).toBe(addTodoDto.text)
      },
      Err(err) {
        throw new Error(err.message)
      },
    })
  })

  test('should fail when attempting to add an invalid todo', async () => {
    const addTodoDto: AddTodoDto = {
      text: '',
    }
    const addResult = await administrationManager.addTodo(addTodoDto)
    addResult.match({
      Ok() {
        throw new Error('Should have failed to add invalid todo')
      },
      Err(err) {
        expect(err.type).toBe('no-text')
      },
    })
  })

  test('should succeed when updating an existing todo', async () => {
    const addResult = await administrationManager.addTodo({ text: 'Test' })
    expect(addResult.isOk()).toBe(true)

    const todo = addResult.unwrap()
    expect(todo.text).toBe('Test')

    const updateResult = await administrationManager.updateTodo({
      id: todo.id,
      text: 'End test',
    })
    expect(updateResult.isOk()).toBe(true)

    const updatedTodo = updateResult.unwrap()
    expect(updatedTodo.id).toBe(todo.id)
    expect(updatedTodo.text).toBe('End test')
  })

  test('should fail when attempting to update todo which does not exist', async () => {
    const updateResult = await administrationManager.updateTodo({
      id: 'fake',
      text: 'Will fail',
    })
    expect(updateResult.isErr()).toBe(true)
    expect(updateResult.unwrapErr().type).toBe('does-not-exist')
  })

  test('should fail when attempting to update a todo with an empty message', async () => {
    const addResult = await administrationManager.addTodo({ text: 'Test' })
    expect(addResult.isOk()).toBe(true)

    const todo = addResult.unwrap()
    const updateResult = await administrationManager.updateTodo({
      id: todo.id,
      text: '',
    })
    expect(updateResult.isErr()).toBe(true)
    expect(updateResult.unwrapErr().type).toBe('no-text')
  })

  test('should succeed when removing an existing todo', async () => {
    const addResult = await administrationManager.addTodo({ text: 'Test' })
    expect(addResult.isOk()).toBe(true)

    const todo = addResult.unwrap()
    const removeResult = await administrationManager.removeTodo({
      id: todo.id,
    })
    expect(removeResult.isOk()).toBe(true)
  })

  test('should fail when attempting to remove a todo which does not exist', async () => {
    const removeResult = await administrationManager.removeTodo({
      id: 'does not exist',
    })
    expect(removeResult.isErr()).toBe(true)
    expect(removeResult.unwrapErr().type).toBe('does-not-exist')
  })
})
