import { TaskDto } from '@utility/common/dtos'
import React from 'react'
import { CreateTask } from './create-task.component'
import { TaskError } from './task-error.component'
import { Task } from './task.component'

export interface TaskListProps {
  error: string | undefined
  tasks: TaskDto[]
  createTask: (text: string) => void
  fetchTasks: () => void
  removeTask: (id: string) => void
  updateTask: (task: TaskDto) => void
}

export const TaskList: React.FC<TaskListProps> = ({
  error,
  tasks,
  createTask,
  fetchTasks,
  removeTask,
  updateTask,
}) => (
  <div>
    <CreateTask onSave={createTask} />
    <TaskError error={error} onTryAgain={fetchTasks} />
    <div>
      {(tasks || []).map((task) => (
        <Task
          key={task.id}
          {...task}
          onChange={updateTask}
          onRemove={removeTask}
        />
      ))}
    </div>
  </div>
)
