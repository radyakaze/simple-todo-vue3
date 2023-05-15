<template>
  <header id="header">
    <h1 class="header__brand">Simple ToDo</h1>
  </header>
</template>

<style lang="scss" scoped>
#header {
  @apply flex;
  @apply justify-center;
  @apply items-center;
  @apply py-4 lg:py-6;
  @apply text-black;

  .header {
    &__brand {
      @apply text-3xl;
      @apply font-semibold;
    }
  }
}
</style>
