import * as uuid from 'uuid'
import { ITodoAccess, TodoDto, TodoQuery } from '@access/todo'
import { IValidationEngine, TodoValidationErrorDto } from '@engine/validation'
import { Result } from '@utility/common/result'
import {
  AddTodoDto,
  IAdministrationManager,
  RemoveTodoDto,
  RemoveTodoErrorDto,
  UpdateTodoDto,
  UpdateTodoError,
} from './types'

export class AdministrationManager implements IAdministrationManager {
  constructor(
    private readonly todoAccess: ITodoAccess,
    private readonly validationEngine: IValidationEngine,
  ) {}

  async findTodos(query: TodoQuery): Promise<TodoDto[]> {
    return this.todoAccess.query(query)
  }

  async addTodo(
    addTodoDto: AddTodoDto,
  ): Promise<Result<TodoDto, TodoValidationErrorDto>> {
    const todo: TodoDto = {
      ...addTodoDto,
      id: uuid.v4(),
      done: false,
    }

    const validationResult = await this.validationEngine.canStoreTodo(todo)
    if (validationResult.isErr()) {
      return validationResult
    }

    await this.todoAccess.store(todo)
    return Result.Ok(todo)
  }

  async updateTodo(
    updateTodoDto: UpdateTodoDto,
  ): Promise<Result<TodoDto, UpdateTodoError>> {
    const existingTodos = await this.todoAccess.query({ id: updateTodoDto.id })
    if (existingTodos.length === 0) {
      return Result.Err({
        type: 'does-not-exist',
        message: `Could not find todo with ID: ${updateTodoDto.id}`,
      })
    }

    const existingTodo = existingTodos[0]
    const updatedTodo = {
      ...existingTodo,
      ...updateTodoDto,
    }
    const validationResult = await this.validationEngine.canStoreTodo(
      updatedTodo,
    )
    if (validationResult.isErr()) {
      return validationResult
    }

    await this.todoAccess.store(updatedTodo)
    return Result.Ok(updatedTodo)
  }

  async removeTodo(
    removeTodoDto: RemoveTodoDto,
  ): Promise<Result<void, RemoveTodoErrorDto>> {
    const existingTodos = await this.todoAccess.query({ id: removeTodoDto.id })
    if (existingTodos.length === 0) {
      return Result.Err({
        type: 'does-not-exist',
        message: `Could not find todo with ID: ${removeTodoDto.id}`,
      })
    }

    await this.todoAccess.remove({ id: removeTodoDto.id })
    return Result.Ok()
  }
}
