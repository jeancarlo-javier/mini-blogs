import { Ref } from 'vue'

export interface UnprocessedPost {
  id: number
  title: string
  content: string
  user_id: number
}

export type Post = {
  id: number
  title: string
  content: string
  userId: number
}

export interface PostCreate {
  title: string
  content: string
}

export type InjectedPosts = Ref<Post[] | null | undefined>
