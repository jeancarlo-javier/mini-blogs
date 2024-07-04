import { ref } from 'vue'
import { User } from '../types/userTypes'
import { Post } from '../types/postTypes'

const user = ref<User | null>(null)
const posts = ref<Post[] | null>(null)

export default {
  user,
  posts
}
