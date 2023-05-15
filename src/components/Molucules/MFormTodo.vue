<script setup lang="ts">
import AInput from '@/components/Atoms/AInput.vue'
import AButton from '@/components/Atoms/AButton.vue'
import { Form, type SubmissionContext } from 'vee-validate'
import { TodoFormSchema } from '@/forms/todo'
import Send from '~icons/ant-design/send-outlined'
import type { InferType } from 'yup'

type submitValue = InferType<typeof TodoFormSchema>

const emit = defineEmits<{
  (e: 'submit', value: submitValue): void
}>()

const onSubmit = (event: Record<string, unknown>, form: SubmissionContext) => {
  emit('submit', event as submitValue)

  form.resetForm()
}
</script>

<template>
  <Form
    v-slot="{ isSubmitting }"
    class="todo-form"
    :validation-schema="TodoFormSchema"
    @submit="onSubmit"
  >
    <AInput name="todo" class="input-todo" placeholder="Add Todo" />
    <AButton icon-only :loading="isSubmitting">
      <Send />
    </AButton>
  </Form>
</template>

<style lang="scss" scoped>
.todo-form {
  @apply flex;
  @apply justify-between;
  @apply gap-1;

  .input-todo {
    @apply grow;
  }
}
</style>
