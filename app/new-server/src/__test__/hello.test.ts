import { sayHello } from '../hello'

describe('sayHello', () => {
  test('should respond with "Hello"', () => {
    expect(sayHello('World')).toBe('Hello World')
  })
})
