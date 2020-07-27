/**
 * ============================================================================
 * Displays the number of upvotes and whether the user has upvoted a playlist
 * ============================================================================
 */

import React from "react"
import { Stack, StatNumber, StatArrow, Button } from "@chakra-ui/core"
import { useAuth0 } from "../../plugins/gatsby-plugin-auth0"
import { useQuery, useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"

const GET_UPVOTES = gql`
  query UpvoteQuery($playlistId: Int!, $userId: String) {
    hasUpvoted: upvote(
      where: { playlist_id: { _eq: $playlistId }, user_id: { _eq: $userId } }
    ) {
      id
      user_id
      upvoted_at
    }
    upvotes: playlist(where: { id: { _eq: $playlistId } }) {
      id
      upvote_aggregate {
        aggregate {
          count(columns: upvoted_at)
        }
      }
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

const UpvoteButton = ({ playlist, ...props }) => {
  console.log(playlist)
  const { loginWithRedirect, isAuthenticated, user } = useAuth0()
  const { data, loading, error } = useQuery(GET_UPVOTES, {
    variables: {
      userId: user?.sub,
      playlistId: playlist.playlistId,
    },
  })
  const [upsertUpvote] = useMutation(UPSERT_UPVOTE)

  const upvoted = isAuthenticated && !!data?.hasUpvoted?.[0]?.upvoted_at
  console.log({ loading, error })
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
              refetchQueries: [`UpvoteQuery`],
            })
          } else {
            console.log(`perform upvote`)
            upsertUpvote({
              variables: {
                playlistId: playlist.playlistId,
                userId: user.sub,
                upvotedAt: new Date().toISOString(),
              },
              refetchQueries: [`UpvoteQuery`],
            })
          }
        } else {
          loginWithRedirect()
        }
      }}
      {...props}
    >
      <Stack color={upvoted ? "blue.600" : "white"} align="center">
        <StatArrow
          color={upvoted ? "blue.600" : "white"}
          type="increase"
          m={0}
        ></StatArrow>
        <StatNumber fontSize="lg">
          {(loading || error) && null}
          {data && data?.upvotes?.[0].upvote_aggregate.aggregate.count}
        </StatNumber>
      </Stack>
    </Button>
  )
}

export default UpvoteButton
