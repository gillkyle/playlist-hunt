/**
 * ============================================================================
 * Static
 * ============================================================================
 */

import React from "react"
import { graphql } from "gatsby"

import { Heading, Text } from "@chakra-ui/react"
import Playlists from "../components/playlists"

export const TOP_PLAYLISTS = graphql`
  query {
    allPlaylist(
      sort: { fields: upvote_aggregate___aggregate___count, order: DESC }
      limit: 10
    ) {
      nodes {
        playlistId
        uri
        title
        description
        gatsbyPath(filePath: "/playlists/{Playlist.title}")
        upvote_aggregate {
          aggregate {
            count
          }
        }
      }
    }
  }
`

export default ({ data }) => (
  <React.Fragment>
    <Heading as="h1">Top Playlists</Heading>
    <Text textAlign="center">
      The best playlists historically from the community. Updated daily.
    </Text>
    <Playlists playlists={data.allPlaylist.nodes} />
  </React.Fragment>
)
