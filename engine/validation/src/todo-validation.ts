import { TodoDto } from '@access/todo'
import { Result } from '@utility/common/result'
import { TodoValidationErrorDto } from './types'

export const canStoreTodo = async (
  todo: TodoDto,
): Promise<Result<void, TodoValidationErrorDto>> => {
  if (todo.text.trim() === '') {
    return Result.Err({
      type: 'no-text',
      message: 'Text cannot be empty',
    })
  }
  return Result.Ok()
}
