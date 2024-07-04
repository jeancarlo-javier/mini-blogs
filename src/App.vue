<template>
  <div class="dark">
    <AppLayout :logout="logoutHandler">
      <RouterView />
    </AppLayout>
  </div>
</template>

<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import AppLayout from './layout/AppLayout.vue'
import { RouterView } from 'vue-router'
import { authUser, clearAuth } from './api/users'
import { User, InjectedUser } from './types/userTypes'
import store from './store'

const loading = ref<boolean>(true)

function setUser(user: User | null): void {
  store.user.value = user
}

function logoutHandler(): void {
  clearAuth()
  setUser(null)
}

provide<InjectedUser>('user', store.user)
provide('posts', store.posts)
provide('loading', loading)

onMounted(async () => {
  console.log('App mounted')

  const user: User | null = await authUser()

  setUser(user)

  loading.value = false
})
</script>
