import React from "react"
import { graphql } from "gatsby"
import { Grid, Heading, Stack, Text } from "@chakra-ui/core"

import SpotifyEmbed from "../../components/spotify-embed"
import UpvoteButton from "../../components/upvote-button"

const PlaylistDetails = ({ data }) => {
  return (
    <React.Fragment>
      <Heading as="h1">{data.playlist.title}</Heading>
      <Text textAlign="center">Details about this playlist.</Text>
      <Grid
        bg="gray.200"
        borderRadius={4}
        my={4}
        p="4"
        minWidth={[320, 360, 540]}
        gridTemplateColumns={`auto 1fr`}
        gridGap={4}
      >
        <SpotifyEmbed
          wide
          tall
          title={data.playlist.title}
          spotifyUri={data.playlist.uri}
        />
        <Stack gap={3}>
          <Stack>
            <Heading fontSize="2xl" fontWeight="bold">
              Playlist Description
            </Heading>
            <Text>{data.playlist.description}</Text>
          </Stack>
          <Stack>
            <Heading fontSize="2xl" fontWeight="bold">
              Upvotes
            </Heading>
            <Grid height={80} gridTemplateColumns={`80px auto`}>
              <UpvoteButton playlist={data.playlist} />
            </Grid>
          </Stack>
        </Stack>
      </Grid>
    </React.Fragment>
  )
}

export default PlaylistDetails

export const query = graphql`
  query($title: String) {
    playlist(title: { eq: $title }) {
      id
      playlistId
      description
      title
      uri
    }
  }
`
