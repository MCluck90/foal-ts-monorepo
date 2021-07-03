import { ITodoAccess, TodoDto } from './types'
import { Connection, FindOperator, Like } from '@access/common'
import { Todo } from '@access/common/entity/todo'
import { isNotNull } from '@utility/common/type-guards'

export const TodoAccess = (connection: Connection): ITodoAccess => ({
  async query(query): Promise<TodoDto[]> {
    const todoRepository = connection.getRepository(Todo)
    return todoRepository.find({
      where: [
        query.id === undefined ? null : { id: query.id },
        query.text === undefined ? null : { text: Like(query.text) },
        query.done === undefined ? null : { done: query.done },
      ].filter(isNotNull),
    })
  },

  async count(query): Promise<number> {
    const todoRepository = connection.getRepository(Todo)
    return todoRepository.count({
      where: [
        query.id === undefined ? null : { id: query.id },
        query.text === undefined ? null : { text: Like(query.text) },
        query.done === undefined ? null : { done: query.done },
      ].filter(isNotNull),
    })
  },

  async store(todo): Promise<void> {
    const todoRepository = connection.getRepository(Todo)
    await todoRepository.save([todo])
    return Promise.resolve()
  },

  async remove(query): Promise<void> {
    const todoRepository = connection.getRepository(Todo)
    await todoRepository.delete({
      id: query.id,
    })
    return Promise.resolve()
  },
})
