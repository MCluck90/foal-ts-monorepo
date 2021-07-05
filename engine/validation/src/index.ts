import { canStoreTodo } from './todo-validation'
import { IValidationEngine } from './types'

export * from './types'

export class ValidationEngine implements IValidationEngine {
  canStoreTodo = canStoreTodo
}
