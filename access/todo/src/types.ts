export interface TodoDto {
  id: string
  text: string
  done: boolean
}

export interface TodoQuery {
  id?: string
  text?: string
  done?: boolean
}

export interface ITodoAccess {
  /**
   * Get all todo items that match a query.
   */
  query(query: TodoQuery): Promise<TodoDto[]>

  /**
   * Count the number of todo items that match a query.
   */
  count(query: TodoQuery): Promise<number>

  /**
   * Store a todo item.
   */
  store(todo: TodoDto): Promise<void>

  /**
   * Remove all todos that match the query.
   */
  remove(query: TodoQuery): Promise<void>
}
