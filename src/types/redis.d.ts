import { Vote } from '@prisma/client'

//required things to cache a post
export type CachedPost = {
  id: string
  title: string
  authorUsername: string
  content: string
  currentVote: Vote['type'] | null
  createdAt: Date
}
