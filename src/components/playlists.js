import React from "react"
import { Box, Grid, Heading, Stack, Text, PseudoBox } from "@chakra-ui/core"

import UpvoteButton from "./upvote-button"
import { getPlaylistId } from "../utils/helpers"

const Playlists = ({ playlists }) => {
  return (
    <Stack width="100%" spacing="1px" my={4}>
      {playlists.map(playlist => (
        <PseudoBox
          key={playlist.uri}
          _first={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
          _last={{ borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }}
          bg="gray.100"
        >
          <Grid
            gridTemplateColumns="80px 1fr 80px"
            gridGap="3"
            p="3"
            width="100%"
          >
            <Box bg="gray.300">
              <iframe
                title={`Spotify playlist embed for ${playlist.title}`}
                src={`https://open.spotify.com/embed/playlist/${getPlaylistId(
                  playlist.uri
                )}`}
                width="80"
                height="80"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
                style={{ borderRadius: 4 }}
              ></iframe>
            </Box>
            <Stack spacing="1" justify="center">
              <Box>
                <Heading fontSize="xl">{playlist.title}</Heading>
              </Box>
              <Box>
                <Text fontSize="sm">{playlist.description}</Text>
              </Box>
            </Stack>
            <UpvoteButton playlist={playlist} />
          </Grid>
        </PseudoBox>
      ))}
    </Stack>
  )
}

export default Playlists

export const PlaylistsPlaceholder = () => (
  <Stack width="100%" spacing="1px" my={4}>
    {Array(5)
      .fill()
      .map((_, index) => (
        <PseudoBox
          key={index}
          height="100px"
          width="100%"
          _first={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
          _last={{
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
          }}
          bg="gray.100"
        />
      ))}
  </Stack>
)
