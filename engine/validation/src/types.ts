import { TodoDto } from '@access/todo/types'
import { Result } from '@utility/common/result'

export type TodoValidationErrorDto = {
  type: 'no-text'
  message: 'Text cannot be empty'
}

export interface ITodoValidationEngine {
  canStoreTodo(todo: TodoDto): Promise<Result<void, TodoValidationErrorDto>>
}

export interface IValidationEngine extends ITodoValidationEngine {}
