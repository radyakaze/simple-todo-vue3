<script setup lang="ts">
import InboxIcon from '~icons/ant-design/inbox-outlined'
import ClockIcon from '~icons/ant-design/clock-circle-outlined'
import { useTodoStore } from '@/stores/todo'
import type { TodoFormSchema } from '@/forms/todo'
import type { InferType } from 'yup'
import { storeToRefs } from 'pinia'
import MFormTodo from '@/components/Molucules/MFormTodo.vue'
import OTodoList from '@/components/Organisms/OTodoList.vue'

const todo = useTodoStore()
const { taskTitle, todoCount, todos, lastUpdate } = storeToRefs(useTodoStore())

const onSubmit = (value: InferType<typeof TodoFormSchema>) => {
  todo.addTodo(value.todo)
}

const onTaskTitleChanged = (event: any) => {
  todo.setTaskTitle(event.target.innerText)
}
</script>

<template>
  <MFormTodo @submit="onSubmit" />

  <div class="task-header">
    <h2 class="task-title">
      <span
        contenteditable
        @keydown.enter.prevent="onTaskTitleChanged"
        class="task-title__editable"
        >{{ taskTitle }}</span
      >
      <strong class="todo-count">({{ todoCount }})</strong>
    </h2>
    <div v-if="lastUpdate" class="task-last-update">
      <ClockIcon />
      {{ lastUpdate }}
    </div>
  </div>

  <OTodoList
    v-if="todos.length"
    :items="todos"
    @done="(id, status) => todo.setTodoComplete(id, status)"
    @delete="todo.deleteTodo($event)"
  />
  <div v-else class="empty-todo">
    <InboxIcon class="empty-todo__icon" />
    <div class="empty-todo__text">Empty Todo</div>
  </div>
</template>

<style lang="scss" scoped>
.task-header {
  @apply flex;
  @apply justify-between;
  @apply my-6;

  .task-title {
    @apply font-light;
    @apply text-xl;

    &__editable {
      @apply appearance-none;
      @apply mr-1;
    }

    .todo-count {
      @apply font-semibold;
    }
  }

  .task-last-update {
    @apply flex;
    @apply items-center;
    @apply self-center;
    @apply text-xs;
    @apply text-gray-extra-dark;
    @apply gap-1;
  }
}

.empty-todo {
  @apply flex;
  @apply flex-col;
  @apply gap-2;
  @apply items-center;
  @apply text-gray-extra-dark;

  &__icon {
    @apply h-32;
    @apply w-32;
  }
}
</style>
