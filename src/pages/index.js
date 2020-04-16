import React from "react"
import { Heading, Text } from "@chakra-ui/core"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

import Playlists from "../components/playlists"

const PLAYLISTS_QUERY = gql`
  query PlaylistsQuery {
    playlist(order_by: { created_at: asc }) {
      id
      title
      description
      uri
    }
  }
`

export default () => {
  const { data, loading, error } = useQuery(PLAYLISTS_QUERY)
  console.log({ data, loading, error })

  return (
    <React.Fragment>
      <Heading as="h1">Newest Playlists</Heading>
      <Text textAlign="center">
        The latest playlists from the community, coming in live.
      </Text>
      <Playlists playlists={undefined} />
    </React.Fragment>
  )
}
