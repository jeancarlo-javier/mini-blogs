<template>
  <component
    :is="componentTag"
    type="button"
    :class="buttonClasses + ' flex items-center justify-center'"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { RouterLink } from 'vue-router'

const { buttonType, tag } = defineProps<{
  buttonType: 'default' | 'primary' | 'secondary' | 'danger'
  tag?: 'button' | 'RouterLink' | 'a'
}>()

let buttonClasses: string = ''

const componentTag = computed(() => {
  switch (tag) {
    case 'RouterLink':
      return RouterLink
    case 'a':
      return 'a'
    default:
      return 'button'
  }
})

switch (buttonType) {
  case 'default':
    buttonClasses =
      'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
    break
  case 'primary':
    buttonClasses =
      'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
    break
  case 'danger':
    buttonClasses =
      'text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-900'
    break
  default:
    break
}
</script>
