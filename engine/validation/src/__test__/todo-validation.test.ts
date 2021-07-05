import { TodoDto } from '@access/todo'
import { canStoreTodo } from '../todo-validation'

describe('todo-validation', () => {
  describe('canStoreTodo', () => {
    test('should return Ok when given a valid todo', async () => {
      const todo: TodoDto = {
        id: '123',
        text: 'Do a thing',
        done: false,
      }

      const result = await canStoreTodo(todo)
      expect(result.isOk())
    })

    test('should return an error when given a todo with an empty text', async () => {
      const todo: TodoDto = {
        id: '456',
        text: '',
        done: true,
      }

      const result = await canStoreTodo(todo)
      result.match({
        Ok() {
          throw new Error(
            'canStoreTodo should return an error when given an empty text',
          )
        },
        Err(error) {
          expect(error.type).toBe('no-text')
        },
      })
    })

    test('should return an error when the text is only whitespace', async () => {
      const todo: TodoDto = {
        id: '456',
        text: ' \r\n\t',
        done: true,
      }

      const result = await canStoreTodo(todo)
      result.match({
        Ok() {
          throw new Error(
            'canStoreTodo should return an error when given a todo with only whitespace',
          )
        },
        Err(error) {
          expect(error.type).toBe('no-text')
        },
      })
    })
  })
})
