<template>
  <div>
    <section class="bg-gray-50 dark:bg-gray-900">
      <div
        v-if="!loading"
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0"
      >
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
            >
              Create an account
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Your name</label
                >
                <input
                  type="name"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John Doe"
                  required
                  v-model="name"
                />
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Your email</label
                >
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  v-model="email"
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Password</label
                >
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  v-model="password"
                />
              </div>
              <AppButton
                type="submit"
                buttonType="primary"
                tag="button"
                @click.prevent="submitForm"
                class="w-full"
              >
                Create an account
              </AppButton>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?
                <RouterLink
                  to="/login"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >Login here</RouterLink
                >
              </p>
            </form>
          </div>
        </div>
      </div>
      <div v-else class="w-full h-full flex justify-center items-center">
        <AppLoader />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import AppButton from '../components/AppButton.vue'
import { registerUser } from '../api/users'
import type { UserCreate } from '../types/userTypes'
import AppLoader from '../components/AppLoader.vue'
import { User } from '../types/userTypes'
import { useRouter } from 'vue-router'
import type { InjectedUser } from '../types/userTypes'

const user: InjectedUser = inject('user') as InjectedUser

const router = useRouter()

const loading = ref<boolean>(false)

const name = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')

async function submitForm(): Promise<void> {
  loading.value = true

  const newUser: UserCreate = {
    name: name.value,
    email: email.value,
    password: password.value
  }

  if (!newUser.name || !newUser.email || !newUser.password) {
    return
  }

  const createdUser: User | null = await registerUser(newUser)

  if (createdUser) {
    router.push('/')

    user.value = createdUser
  }

  loading.value = false
}
</script>
