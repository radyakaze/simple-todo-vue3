<script setup lang="ts">
import { type PropType, toRefs } from 'vue'
import { useVModel, createReusableTemplate } from '@vueuse/core'
import { Field } from 'vee-validate'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: null
  },
  type: {
    type: String as PropType<'text' | 'password' | 'number' | 'email' | 'search'>,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: undefined
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: undefined
  },
  error: {
    type: String,
    default: undefined
  }
})

const inputValue = useVModel(props, 'modelValue')

const { type, disabled, placeholder, size, error } = toRefs(props)

const [DefineTemplate, ReuseTemplate] = createReusableTemplate<{
  errormsg?: string
}>()
</script>

<template>
  <div :class="['input-component', `input-component--${size}`]">
    <!-- eslint-disable-next-line vue/no-unused-vars -->
    <DefineTemplate v-slot="{ $slots, errormsg, ...slotProps }">
      <div :class="['input-group', { 'has-error': errormsg }]">
        <input
          v-model="inputValue"
          class="input"
          :type="type"
          :disabled="disabled"
          :placeholder="placeholder"
          v-bind="{ ...slotProps, ...$attrs }"
        />
      </div>
      <div v-if="errormsg" class="error">{{ errormsg }}</div>
    </DefineTemplate>

    <Field v-if="name" v-slot="{ field, errorMessage }" :name="name" :validate-on-blur="false">
      <ReuseTemplate v-model="inputValue" v-bind="field" :errormsg="errorMessage" />
    </Field>

    <ReuseTemplate v-else v-model="inputValue" :errormsg="error" />
  </div>
</template>

<style lang="scss" scoped>
.input-component {
  + .input-component {
    @apply mt-4;
  }

  .input-group {
    @apply relative;

    .input {
      @apply appearance-none;
      @apply outline-none;
      @apply border;
      @apply rounded;
      @apply border-gray-dark;
      @apply w-full;
      @apply focus:ring-4;
      @apply focus:ring-blue-200;
      @apply focus:ring-opacity-25;
      @apply transition-shadow;
      @apply ease-in-out;
      @apply duration-150;
      @apply text-black;

      &:placeholder {
        @apply text-gray-extra-dark;
      }
    }

    .eye-icon {
      @apply text-gray-extra-dark;
      @apply h-[1.125rem];
      @apply w-[1.125rem];
      @apply absolute;
      @apply top-1/2;
      @apply right-3;
      @apply cursor-pointer;
      @apply -translate-y-1/2;
    }

    &.has-error {
      .input {
        @apply text-danger;
        @apply focus:ring-danger;
        @apply focus:ring-opacity-60;
        @apply border-danger;
        @apply animate-shake;
      }
    }
  }

  .error {
    @apply mt-1;
    @apply flex;
    @apply text-danger;
    @apply text-xs;
    @apply items-center;
    @apply animate-shake;
  }

  &.input-component {
    &--small {
      .input {
        @apply py-1.5;
        @apply px-2.5;
        @apply text-sm;
      }
    }

    &--medium {
      .input {
        @apply py-2;
        @apply px-3.5;
        @apply text-base;
      }
    }

    &--large {
      .input {
        @apply py-2.5;
        @apply px-4;
        @apply text-xl;
      }
    }
  }
}
</style>
