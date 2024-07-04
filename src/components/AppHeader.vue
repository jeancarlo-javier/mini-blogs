<template>
  <section class="flex bg-gray-50 dark:bg-gray-900 mb-10">
    <div class="w-full max-w-screen-xl px-4 mx-auto lg:px-12">
      <!-- Start coding here -->
      <div
        class="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg"
      >
        <div
          class="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4"
        >
          <div class="flex gap-3">
            <AppButton
              v-if="route.name !== 'Home'"
              tag="RouterLink"
              buttonType="default"
              to="/"
            >
              <img src="../assets/homeIcon.svg" alt="home" />
            </AppButton>
            <div>
              <h5 class="mr-3 font-semibold dark:text-white">
                Auth User: {{ user?.name }}
              </h5>
              <p class="text-gray-500 dark:text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
          <div class="flex gap-5">
            <AppButton
              v-if="user"
              tag="RouterLink"
              buttonType="default"
              to="/create-post"
            >
              <RouterLink to="/create-post">Create Post</RouterLink>
            </AppButton>
            <AppButton
              v-if="!user"
              tag="RouterLink"
              buttonType="default"
              to="/login"
            >
              Login
            </AppButton>
            <AppButton
              v-if="!user"
              buttonType="primary"
              tag="RouterLink"
              to="/register"
            >
              Register
            </AppButton>
            <AppButton
              v-if="user"
              buttonType="danger"
              tag="button"
              @click="logout"
            >
              Logout
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { InjectedUser } from '../types/userTypes'
import AppButton from './AppButton.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const { logout } = defineProps<{
  logout: () => void
}>()

const user: InjectedUser = inject('user') as InjectedUser
</script>
