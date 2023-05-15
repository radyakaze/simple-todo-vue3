<script setup lang="ts">
import Check from '~icons/ant-design/check-outlined'
import { useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  change: [e: Event]
}>()

const modelValue = useVModel(props, 'modelValue')
</script>

<template>
  <label class="checkbox">
    <input
      v-model="modelValue"
      type="checkbox"
      class="checkbox--input"
      @change="emit('change', $event)"
    />
    <span class="checkbox--icon">
      <Check />
    </span>
  </label>
</template>

<style lang="scss" scoped>
.checkbox {
  &--input {
    @apply hidden;
  }

  &--icon {
    @apply block;
    @apply rounded-full;
    @apply h-6;
    @apply w-6;
    @apply bg-gray;
    @apply bg-opacity-40;
    @apply text-transparent;
    @apply flex;
    @apply justify-center;
    @apply items-center;
    @apply duration-500;
    @apply transition-colors;
    @apply ease-in-out;
  }

  &--input:checked ~ &--icon {
    @apply bg-success;
    @apply text-white;
  }
}
</style>
