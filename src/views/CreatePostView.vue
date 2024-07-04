<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-6 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Add a new post
      </h2>
      <form action="#">
        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div class="sm:col-span-2">
            <label
              for="post-title"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Post Title</label
            >
            <input
              v-model="title"
              type="text"
              name="post-title"
              id="post-title"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type post title"
              required
            />
          </div>
          <div class="sm:col-span-2">
            <label
              for="description"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Description</label
            >
            <textarea
              v-model="content"
              id="description"
              rows="8"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Your description here"
            ></textarea>
          </div>
        </div>
        <AppButton
          type="submit"
          buttonType="primary"
          tag="button"
          class="w-full mt-6"
          @click.prevent="submitForm"
        >
          Add Post
        </AppButton>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Ref, ref, inject } from 'vue'
import AppButton from '../components/AppButton.vue'
import { createPost } from '../api/posts'
import { useRouter } from 'vue-router'
import type { Post, PostCreate } from '../types/postTypes'

const router = useRouter()

const loading = ref<boolean>(false)

const title = ref<string>('')
const content = ref<string>('')

const posts = inject('posts') as Ref<Post[] | null>

async function submitForm(): Promise<void> {
  loading.value = true

  const postData: PostCreate = {
    title: title.value,
    content: content.value
  }

  const newPost = await createPost(postData)

  if (newPost) {
    router.push('/')

    if (posts.value) {
      posts.value = [newPost, ...posts.value]
    }
  }

  loading.value = false
}
</script>
