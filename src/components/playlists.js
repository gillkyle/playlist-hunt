import React from "react"
import { Box, Grid, Heading, Stack, Text, Button } from "@chakra-ui/core"

import UpvoteButton from "./upvote-button"
import { getPlaylistId } from "../utils/helpers"

const playlistsStub = [
  {
    title: `Tropical Vibes`,
    description: `Poolside tunes with pan flutes and poppy synths and pianos for summer days at the beach.`,
    uri: `spotify:playlist:1R78QE70QDwK6LGH69yQQ3`,
  },
  {
    title: `Underground Future Pop`,
    description: `Songs with under a million streams that should've blown up.`,
    uri: `spotify:playlist:1yvSA6qu5LD9jDmsdo6YUJ`,
  },
  {
    title: `Global Top 50`,
    description: `Your daily update of the most played tracks right now.`,
    uri: `spotify:playlist:37i9dQZEVXbMDoHDwVN2tF`,
  },
  {
    title: `Oriental Electronica`,
    description: `The twangy sounds of accidentals and eastern asian sitars, dizus, erhus, harps, and more.`,
    uri: `spotify:playlist:4hgzeRQxb8QFzSPkzJ2pKm`,
  },
  {
    title: `United States Top 50`,
    description: `Your daily update of the most played tracks in the United States right now.`,
    uri: `spotify:playlist:37i9dQZEVXbLRQDuF5jeBp`,
  },
]

const Playlists = ({ playlists = playlistsStub }) => {
  return (
    <Stack width="100%" spacing="1px">
      {playlists.map(playlist => (
        <Grid
          gridTemplateColumns="80px 1fr 80px"
          gridGap="3"
          p="3"
          bg="gray.100"
          width="100%"
        >
          <Box bg="gray.300">
            <iframe
              src={`https://open.spotify.com/embed/playlist/${getPlaylistId(
                playlist.uri
              )}`}
              width="80"
              height="80"
              frameborder="0"
              allowtransparency="true"
              allow="encrypted-media"
              style={{ borderRadius: 4 }}
            ></iframe>
          </Box>
          <Stack>
            <Heading fontSize="xl" marginBottom={0}>
              {playlist.title}
            </Heading>
            <Text fontSize="sm">{playlist.description}</Text>
          </Stack>
          <UpvoteButton />
        </Grid>
      ))}
    </Stack>
  )
}

export default Playlists
