<script setup lang="ts">
import { type PropType, toRefs } from 'vue'
import LoadingIcon from '~icons/ant-design/loading-outlined'

const props = defineProps({
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: undefined
  },
  variant: {
    type: String as PropType<'primary' | 'secondary'>,
    default: 'primary'
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  iconOnly: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  full: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits<{ (e: 'click', event: MouseEvent): void }>()

const { variant, size, disabled, iconOnly, full, loading, type } = toRefs(props)

const onClick = (e: MouseEvent) => {
  emits('click', e)
}
</script>

<template>
  <button
    :class="[
      'button',
      `button--${variant}`,
      `button--${size}`,
      {
        'button--icon-only': iconOnly,
        'w-full': full,
        'button--loading': loading
      }
    ]"
    :type="type"
    :disabled="disabled || loading"
    @click="onClick"
  >
    <div v-if="loading" class="button__loading_icon">
      <LoadingIcon class="button__loading_icon_svg" />
    </div>
    <div class="button__content">
      <slot />
    </div>
  </button>
</template>

<style lang="scss" scoped>
.button {
  @apply font-medium;
  @apply box-border;
  @apply rounded;
  @apply transition-colors;
  @apply duration-75;
  @apply ease-in-out;
  @apply appearance-none;

  &.button {
    &--small {
      @apply py-1.5;
      @apply px-2.5;
      @apply text-sm;
    }

    &--medium {
      @apply py-2;
      @apply px-3.5;
      @apply text-base;
    }

    &--large {
      @apply py-2.5;
      @apply px-4;
      @apply text-xl;
    }

    &--primary {
      @apply text-white;
      @apply bg-orange-200;
      @apply hover:bg-orange-400 hover:border-orange-600;
      @apply focus:bg-orange-400 focus:border-orange-600;
      @apply active:ring-4 active:ring-orange-200;
    }

    &--secondary {
      @apply text-white;
      @apply bg-blue-200;
      @apply hover:bg-blue-400 hover:border-blue-600;
      @apply focus:bg-blue-400 focus:border-blue-600;
      @apply active:ring-4 active:ring-blue-200;
    }

    &:disabled {
      @apply opacity-60;
      @apply pointer-events-none;
    }

    &:active {
      @apply transition-shadow;
      @apply ease-in-out;
      @apply duration-150;
    }

    .button__content {
      @apply flex;
      @apply gap-2;
      @apply items-center;
      @apply justify-center;
    }

    &--icon-only {
      @apply p-0;

      &.button {
        &--small {
          @apply h-[31px] w-[31px];
        }

        &--medium {
          @apply h-[42px] w-[42px];
        }

        &--large {
          @apply h-[48px] w-[48px];
        }
      }
    }

    &--loading {
      @apply relative;

      .button {
        &__loading_icon {
          @apply absolute;
          @apply top-1/2;
          @apply left-1/2;
          @apply -translate-x-1/2;
          @apply -translate-y-1/2;

          svg {
            @apply animate-spin;
          }
        }

        &__content {
          @apply opacity-0;
        }
      }
    }
  }
}
</style>
