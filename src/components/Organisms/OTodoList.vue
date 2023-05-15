<script setup lang="ts">
import { type PropType, ref } from 'vue'
import { useSortable } from '@vueuse/integrations/useSortable'
import MCard from '@/components/Molucules/MCard.vue'
import type { Todo } from '@/types/todo'
import { useVModel } from '@vueuse/core'

const props = defineProps({
  items: {
    type: Array as PropType<Todo[]>,
    default: () => []
  }
})

const emit = defineEmits<{
  'update:items': [items: Todo[]]
  done: [id: string, isDone: boolean]
  delete: [id: string]
  update: [id: string, text: string]
}>()

const items = useVModel(props, 'items')
const el = ref<HTMLElement | null>(null)

const onDone = (id: string, status: boolean) => {
  emit('done', id, status)
}

useSortable(el, items)
</script>

<template>
  <TransitionGroup ref="el" name="list" tag="div" class="card-list">
    <MCard
      v-for="todo in items"
      :key="todo.id"
      :todo="todo"
      @done="onDone"
      @delete="emit('delete', $event)"
      @update="(id, text) => emit('update', id, text)"
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
