import React from "react"
import { Stack, StatNumber, StatArrow, Button } from "@chakra-ui/core"
import { useAuth0 } from "../../plugins/gatsby-plugin-auth0"
import { useQuery, useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"

const UPVOTE_QUERY = gql`
  query UpvoteQuery($playlistId: Int!, $userId: String) {
    hasUpvoted: upvote(
      where: { playlist_id: { _eq: $playlistId }, user_id: { _eq: $userId } }
    ) {
      id
      user_id
      upvoted_at
    }
    upvotes: upvote(where: { playlist_id: { _eq: $playlistId } }) {
      id
      user_id
      upvoted_at
    }
  }
`

const UPSERT_UPVOTE = gql`
  mutation($playlistId: Int!, $userId: String!, $upvotedAt: timestamp) {
    insert_upvote(
      objects: {
        playlist_id: $playlistId
        user_id: $userId
        upvoted_at: $upvotedAt
      }
      on_conflict: {
        constraint: upvote_user_id_playlist_id_key
        update_columns: upvoted_at
      }
    ) {
      affected_rows
      returning {
        id
        playlist_id
        upvoted_at
        user_id
      }
    }
  }
`

const UpvoteButton = ({ playlist }) => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0()
  const { data, loading, error } = useQuery(UPVOTE_QUERY, {
    variables: {
      userId: user?.sub,
      playlistId: playlist.playlistId,
    },
  })
  const [upsertUpvote, { error: muterr, data: mutdata }] = useMutation(
    UPSERT_UPVOTE
  )
  console.log({ muterr, mutdata })
  console.log(data)
  const upvoted = isAuthenticated && !!data?.hasUpvoted?.[0]?.upvoted_at
  const upvoteCount = data?.upvotes.filter(upvote => upvote.upvoted_at).length

  return (
    <Button
      height="100%"
      variant={upvoted ? "outline" : "solid"}
      variantColor="blue"
      onClick={() => {
        if (isAuthenticated) {
          if (upvoted) {
            console.log(`remove upvote`)
            upsertUpvote({
              variables: {
                playlistId: playlist.playlistId,
                userId: user.sub,
                upvotedAt: null,
              },
            })
          } else {
            console.log(`perform upvote`)
            upsertUpvote({
              variables: {
                playlistId: playlist.playlistId,
                userId: user.sub,
                upvotedAt: new Date().toISOString(),
              },
            })
          }
        } else {
          loginWithRedirect()
        }
      }}
    >
      <Stack color={upvoted ? "blue.600" : "white"} align="center">
        <StatArrow
          color={upvoted ? "blue.600" : "white"}
          type="increase"
          m={0}
        ></StatArrow>
        <StatNumber fontSize="lg">
          {(loading || error) && null}
          {data && upvoteCount}
        </StatNumber>
      </Stack>
    </Button>
  )
}

export default UpvoteButton
