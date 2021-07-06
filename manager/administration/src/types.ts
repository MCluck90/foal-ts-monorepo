import { TodoDto, TodoQuery } from '@access/todo'
import { TodoValidationErrorDto } from '@engine/validation'
import { Result } from '@utility/common/result'

export interface AddTodoDto {
  text: string
}
export type AddTodoError = TodoValidationErrorDto

export interface UpdateTodoDto {
  id: string
  text?: string
  done?: boolean
}
export type UpdateTodoError =
  | TodoValidationErrorDto
  | {
      type: 'does-not-exist'
      message: string
    }

export interface RemoveTodoDto {
  id: string
}
export interface RemoveTodoErrorDto {
  type: 'does-not-exist'
  message: string
}

export interface ITodoManager {
  findTodos(query: TodoQuery): Promise<TodoDto[]>

  addTodo(addTodoDto: AddTodoDto): Promise<Result<TodoDto, AddTodoError>>

  updateTodo(
    updateTodoDto: UpdateTodoDto,
  ): Promise<Result<TodoDto, UpdateTodoError>>

  removeTodo(
    removeTodoDto: RemoveTodoDto,
  ): Promise<Result<void, RemoveTodoErrorDto>>
}

export interface IAdministrationManager extends ITodoManager {}
