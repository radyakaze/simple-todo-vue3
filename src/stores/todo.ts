import { defineStore } from 'pinia'
import type { Todo } from '@/types/todo'
import { nanoid } from 'nanoid/non-secure'
import { useTimeAgo } from '@vueuse/core'

// TODO: pinia persistent not working on pinia composition api
export const useTodoStore = defineStore('todo', {
  state: () => ({
    taskTitle: 'Untitled Todo',
    todos: [] as Todo[],
    updatedAt: undefined as string | undefined
  }),
  getters: {
    todoCount: (state) => state.todos.length,
    lastUpdate: (state) => state.updatedAt && useTimeAgo(state.updatedAt).value
  },
  actions: {
    update() {
      this.updatedAt = new Date().toISOString()
    },
    setTaskTitle(title: string) {
      this.taskTitle = title
    },
    addTodo(text: string) {
      this.todos.unshift({
        id: nanoid(),
        text,
        is_done: false,
        created_at: new Date().toISOString()
      })

      this.update()
    },
    setTodoComplete(todoItemId: string, status: boolean) {
      this.todos = this.todos.map((todo) => ({
        ...todo,
        is_done: todo.id === todoItemId ? status : todo.is_done
      }))

      this.update()
    },
    updateTodo(todoItemId: string, text: string) {
      this.todos = this.todos.map((todo) => ({
        ...todo,
        text: todo.id === todoItemId ? text : todo.text
      }))

      this.update()
    },
    deleteTodo(todoItemId: string) {
      this.todos = this.todos.filter((todo) => todo.id !== todoItemId)

      this.update()
    }
  },
  persist: true
})
