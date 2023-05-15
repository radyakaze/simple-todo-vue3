<script setup lang="ts">
import { type PropType, toRef, watch } from 'vue'
import ACheckbox from '@/components/Atoms/ACheckbox.vue'
import type { Todo } from '@/types/todo'
import { useToggle } from '@vueuse/core'
import TrashIcon from '~icons/ant-design/delete-outlined'

const props = defineProps({
  todo: {
    type: Object as PropType<Todo>,
    required: true
  }
})

const emit = defineEmits<{
  done: [id: string, isDone: boolean]
  delete: [id: string]
}>()

const todo = toRef(props, 'todo')

const [isDone, toggleDone] = useToggle(todo.value.is_done)

watch(isDone, (value) => {
  emit('done', todo.value.id, value)
})
</script>

<template>
  <div :class="['card', { 'card--done': todo.is_done }]">
    <ACheckbox class="card__checkbox" :model-value="todo.is_done" @change="toggleDone()" />
    <div class="card__body">{{ todo.text }}</div>
    <TrashIcon class="card__delete" @click="emit('delete', todo.id)" />
  </div>
</template>

<style lang="scss" scoped>
.card {
  @apply flex;
  @apply rounded-lg;
  @apply bg-white;
  @apply px-5;
  @apply py-4;
  @apply gap-2;
  @apply min-w-full;
  @apply hover:shadow-md;

  &__body {
    @apply transition-all;
    @apply duration-300;
    @apply ease-linear;
    @apply min-w-[100px];
    @apply grow;
    @apply basis-0;
    @apply truncate;
  }

  &__time {
    @apply text-gray-extra-dark;
    @apply text-xs;
    @apply ml-auto;
  }

  &__delete {
    @apply self-center;
    @apply text-danger;
    @apply h-4;
    @apply w-4;
    @apply cursor-pointer;
  }

  &--done {
    .card__body {
      @apply line-through;
      @apply text-gray-extra-dark;
    }
  }
}
</style>
