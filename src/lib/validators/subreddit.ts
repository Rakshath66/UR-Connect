import { z } from 'zod'

//zod - validator library - if any object passed, the data in schema is only retrived
// {name: "rak" ,age: 21} -> schema{name: } -> output{name: "rak"}
export const SubredditValidator = z.object({
  name: z.string().min(3).max(21),
})

export const SubredditSubscriptionValidator = z.object({
  subredditId: z.string(),
})

export type CreateSubredditPayload = z.infer<typeof SubredditValidator>
export type SubscribeToSubredditPayload = z.infer<
  typeof SubredditSubscriptionValidator
>
