import { TaskDto } from '@utility/common/dtos'
import { RouteState } from '~/types'

export type AppRouteState = RouteState<{
  server: {
    tasks: TaskDto[] | null
  }
  local: {
    newTaskText: string
    error?: string
    loading?: boolean
  }
}>
