import React from "react"
import { Heading, Text } from "@chakra-ui/react"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

import Playlists, { PlaylistsPlaceholder } from "../components/playlists"

const NEW_PLAYLISTS = gql`
  query PlaylistsQuery {
    playlist(order_by: { created_at: desc }) {
      playlistId: id
      title
      description
      uri
      upvote_aggregate {
        aggregate {
          count(columns: upvoted_at)
        }
      }
    }
  }
`

export default () => {
  const { loading, data, error } = useQuery(NEW_PLAYLISTS)

  return (
    <React.Fragment>
      <Heading as="h1">Newest Playlists</Heading>
      <Text textAlign="center">
        The latest playlists from the community, coming in live.
      </Text>
      {loading && <PlaylistsPlaceholder />}
      {data && <Playlists playlists={data.playlist} />}
      {error && "There was an error loading data"}
    </React.Fragment>
  )
}
