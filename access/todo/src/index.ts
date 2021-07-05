import { ITodoAccess, TodoDto, TodoQuery } from './types'
import { Connection, Like } from '@access/common'
import { Todo } from '@access/common/entity/todo'
import { isNotNull } from '@utility/common/type-guards'

export * from './types'

export class TodoAccess implements ITodoAccess {
  constructor(private readonly connection: Connection) {}

  async query(query: TodoQuery): Promise<TodoDto[]> {
    const todoRepository = this.connection.getRepository(Todo)
    return todoRepository.find({
      where: [
        query.id === undefined ? null : { id: query.id },
        query.text === undefined ? null : { text: Like(query.text) },
        query.done === undefined ? null : { done: query.done },
      ].filter(isNotNull),
    })
  }

  async count(query: TodoQuery): Promise<number> {
    const todoRepository = this.connection.getRepository(Todo)
    return todoRepository.count({
      where: [
        query.id === undefined ? null : { id: query.id },
        query.text === undefined ? null : { text: Like(query.text) },
        query.done === undefined ? null : { done: query.done },
      ].filter(isNotNull),
    })
  }

  async store(todo: TodoDto): Promise<void> {
    const todoRepository = this.connection.getRepository(Todo)
    await todoRepository.save([todo])
    return Promise.resolve()
  }

  async remove(query: TodoQuery): Promise<void> {
    const todoRepository = this.connection.getRepository(Todo)
    await todoRepository.delete({
      id: query.id,
    })
    return Promise.resolve()
  }
}
