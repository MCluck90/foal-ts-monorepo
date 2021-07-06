import { TaskDto } from '@access/task/types'
import { Result } from '@utility/common/result'

export type TaskValidationErrorDto = {
  type: 'no-text'
  message: 'Text cannot be empty'
}

export interface ITaskValidationEngine {
  canStoreTask(task: TaskDto): Promise<Result<void, TaskValidationErrorDto>>
}

export interface IValidationEngine extends ITaskValidationEngine {}
