<script setup lang="ts">
import type { PropType } from 'vue'
import MCard from '@/components/Molucules/MCard.vue'
import type { Todo } from '@/types/todo'

defineProps({
  items: {
    type: Array as PropType<Todo[]>,
    default: () => []
  }
})

const emit = defineEmits<{
  done: [id: string, isDone: boolean]
  delete: [id: string]
}>()

const onDone = (id: string, status: boolean) => {
  emit('done', id, status)
}
</script>

<template>
  <TransitionGroup name="list" tag="div" class="card-list">
    <MCard
      v-for="todo in items"
      :key="todo.id"
      :todo="todo"
      @done="onDone"
      @delete="emit('delete', $event)"
    />
  </TransitionGroup>
</template>

<style lang="scss" scoped>
.card-list {
  @apply grid;
  @apply gap-3;
}

.list {
  &-enter-active,
  &-leave-active {
    @apply transition-all;
    @apply duration-500;
    @apply ease-in-out;
  }

  &-enter-from,
  &-leave-to {
    @apply opacity-0;
    @apply translate-x-8;
  }
}
</style>
