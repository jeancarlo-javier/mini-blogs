<template>
  <div class="bg-white dark:bg-gray-900 p-4 min-h-screen">
    <div v-if="!loading">
      <AppHeader :logout="logout" />
      <div
        class="text-black dark:text-white w-full max-w-screen-xl px-4 mx-auto lg:px-12"
      >
        <slot />
      </div>
    </div>
    <div v-else class="w-full h-full flex justify-center items-center">
      <AppLoader />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
import AppLoader from '../components/AppLoader.vue'
import { inject, defineProps } from 'vue'

const { logout } = defineProps<{
  logout: () => void
}>()

const loading: boolean = (inject('loading') as boolean) || false
</script>
