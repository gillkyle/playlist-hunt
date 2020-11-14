import React, { Fragment, useEffect, useState } from "react"
import { Grid, Heading, Stack, Text } from "@chakra-ui/react"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

import ClientOnly from "../../components/client-only"
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
  const { loading, data } = useQuery(PLAYLIST_QUERY, {
    variables: { title: title?.replace("-", " ") },
    ssr: false,
  })
  const [state, setState] = useState(null)

  useEffect(() => {
    if (data) {
      setState(data)
    }
  }, [data])

  const FOUND_PLAYLIST = !loading && state?.playlist.length === 1

  return (
    <React.Fragment>
      <Heading as="h1">
        {FOUND_PLAYLIST && state.playlist[0].title}
        {!FOUND_PLAYLIST && (loading ? "Loading..." : "Playlist not Found")}
      </Heading>
      <Text textAlign="center">Details about this playlist.</Text>
      <ClientOnly>
        <Grid
          bg="gray.200"
          borderRadius={4}
          my={4}
          p="4"
          minWidth={[320, 360, 540]}
          gridTemplateColumns={`auto 1fr`}
          gridGap={4}
        >
          {!FOUND_PLAYLIST && "No playlist found at /" + title}
          {FOUND_PLAYLIST && (
            <Fragment>
              <SpotifyEmbed
                wide
                tall
                title={state.playlist[0].title}
                spotifyUri={state.playlist[0].uri}
              />
              <Stack gap={3}>
                <Stack>
                  <Heading fontSize="2xl" fontWeight="bold">
                    Playlist Description
                  </Heading>
                  <Text>{state.playlist[0].description}</Text>
                </Stack>
                <Stack>
                  <Heading fontSize="2xl" fontWeight="bold">
                    Upvotes
                  </Heading>
                  <Grid height={80} gridTemplateColumns={`80px auto`}>
                    <UpvoteButton
                      playlist={{
                        playlistId: state.playlist[0].id,
                        ...state.playlist[0],
                      }}
                    />
                  </Grid>
                </Stack>
              </Stack>
            </Fragment>
          )}
        </Grid>
      </ClientOnly>
    </React.Fragment>
  )
}

export default ClientPlaylistDetails
