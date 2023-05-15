<script setup lang="ts">
import { RouterView } from 'vue-router'
import OHeader from '@/components/Organisms/OHeader.vue'
</script>

<template>
  <div id="layout">
    <OHeader />
    <main id="main">
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss" scoped>
#main {
  @apply container;
  @apply px-2 lg:px-0;
}
</style>
