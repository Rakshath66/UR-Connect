import { getAuthSession } from '@/lib/auth'
import type { Post, Vote } from '@prisma/client'
import { notFound } from 'next/navigation'
import PostVoteClient from './PostVoteClient'

interface PostVoteServerProps {
  postId: string
  initialVotesAmt?: number
  initialVote?: Vote['type'] | null
  getData?: () => Promise<(Post & { votes: Vote[] }) | null>
}

/**
 * We split the PostVotes into a client and a server component to allow for dynamic data
 * fetching inside of this component, allowing for faster page loads via suspense streaming.
 * We also have to option to fetch this info on a page-level and pass it in.
 *
 */

//hybrid method - we can post posid or initialvotesamt and initial vote or getdata function
//if we use getdata, there is loading state. we can use suspense with component until getdata is executed
//if we pass initialVoteamt and initialvote it is accessible, we don't need worry about streaming at all
const PostVoteServer = async ({
  postId,
  initialVotesAmt,
  initialVote,
  getData,
}: PostVoteServerProps) => {
  const session = await getAuthSession()

  let _votesAmt: number = 0
  let _currentVote: Vote['type'] | null | undefined = undefined

  //either getdata or params and send that 
  if (getData) {
    // fetch data in component
    const post = await getData()
    if (!post) return notFound()

    //getting post count
    _votesAmt = post.votes.reduce((acc, vote) => {
      if (vote.type === 'UP') return acc + 1
      if (vote.type === 'DOWN') return acc - 1
      return acc
    }, 0)

    //getting current vote
    _currentVote = post.votes.find(
      (vote) => vote.userId === session?.user?.id
    )?.type
  } else {
    // passed as props
    _votesAmt = initialVotesAmt!
    _currentVote = initialVote
  }

  return (
    <PostVoteClient
      postId={postId}
      initialVotesAmt={_votesAmt}
      initialVote={_currentVote}
    />
  )
}

export default PostVoteServer
