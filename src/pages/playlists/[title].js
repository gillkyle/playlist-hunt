import React, { Fragment } from "react"
import { Grid, Heading, Stack, Text } from "@chakra-ui/core"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

import SpotifyEmbed from "../../components/spotify-embed"
import UpvoteButton from "../../components/upvote-button"

const PLAYLIST_QUERY = gql`
  query PlaylistQuery($title: String) {
    playlist(where: { title: { _ilike: $title } }, limit: 1) {
      id
      title
      description
      uri
    }
  }
`

const ClientPlaylistDetails = ({ title }) => {
  const { loading, data, error } = useQuery(PLAYLIST_QUERY, {
    variables: { title: title.replace("-", " ") },
  })

  return (
    <React.Fragment>
      <Heading as="h1">{data?.playlist[0].title ?? "Loading..."}</Heading>
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
        {error && "No playlist found"}
        {!loading && data.playlist.length === 1 && (
          <Fragment>
            <SpotifyEmbed
              wide
              tall
              title={data.playlist[0].title}
              spotifyUri={data.playlist[0].uri}
            />
            <Stack gap={3}>
              <Stack>
                <Heading fontSize="2xl" fontWeight="bold">
                  Playlist Description
                </Heading>
                <Text>{data.playlist[0].description}</Text>
              </Stack>
              <Stack>
                <Heading fontSize="2xl" fontWeight="bold">
                  Upvotes
                </Heading>
                <Grid height={80} gridTemplateColumns={`80px auto`}>
                  <UpvoteButton
                    playlist={{
                      playlistId: data.playlist[0].id,
                      ...data.playlist[0],
                    }}
                  />
                </Grid>
              </Stack>
            </Stack>
          </Fragment>
        )}
      </Grid>
    </React.Fragment>
  )
}

export default ClientPlaylistDetails
