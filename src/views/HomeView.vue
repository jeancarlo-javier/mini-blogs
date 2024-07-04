<template>
  <div>
    <div v-if="user">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-center mb-4">
          {{ user?.name }}'s Blog
        </h1>
        <span class="text-1xl text-gray-400">{{ user?.email }}</span>
      </div>
      <hr class="my-8 border-gray-400 border-1" />

      <div
        class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0"
      >
        <div v-for="post in posts" :key="post.id">
          <h3 class="mb-2 text-xl font-bold dark:text-white">
            {{ post.title }}
          </h3>
          <p class="text-gray-500 dark:text-gray-400">
            {{ post.content }}
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="text-center">
        <h1 class="text-3xl font-bold text-center mb-4">
          Login to see your blog
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, watch } from 'vue'
import { fetchPosts } from '../api/posts'
import type { InjectedUser } from '../types/userTypes'
import type { InjectedPosts } from '../types/postTypes'

const user: InjectedUser = inject('user') as InjectedUser
const posts = inject('posts') as InjectedPosts

watch(
  user,
  async (currentUser: InjectedUser) => {
    if (currentUser) {
      const fetchedPosts = await fetchPosts()

      if (fetchedPosts) {
        posts.value = fetchedPosts
      }
    }
  },
  { immediate: true }
)
</script>
