import type { Post, PostCreate, UnprocessedPost } from '../types/postTypes'
import { getLocalAuth } from './users'

const apiUrl =
  import.meta.env.VITE_ENV === 'development'
    ? '/api'
    : import.meta.env.VITE_BACKEND_URL

export async function fetchPosts(): Promise<Post[] | null> {
  const response = await fetch(`${apiUrl}/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${getLocalAuth()}`
    },
    credentials: 'include'
  })

  if (response.status !== 200) {
    return null
  }

  const posts = await response.json()

  if (!posts) return null

  const processedPosts: Post[] = posts.map((post: UnprocessedPost) => {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      userId: post.user_id
    }
  })

  return processedPosts
}

export async function createPost(post: PostCreate): Promise<Post | null> {
  const response = await fetch(`${apiUrl}/create-post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${getLocalAuth()}`
    },
    body: JSON.stringify(post),
    credentials: 'include'
  })

  if (response.status !== 200) return null

  const newPost = await response.json()

  if (!newPost) return null

  const processedPost: Post = {
    id: newPost.id,
    title: newPost.title,
    content: newPost.content,
    userId: newPost.user_id
  }

  return processedPost
}
