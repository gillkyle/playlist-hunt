/**
 * ============================================================================
 * Renders a list of playlists that are passed in through props
 * ============================================================================
 */

import React from "react"
import {
  Box,
  Grid,
  Heading,
  Stack,
  Text,
  PseudoBox,
  useColorMode,
} from "@chakra-ui/core"
import { Link as GatsbyLink } from "gatsby"
import slugify from "slugify"

import SpotifyEmbed from "./spotify-embed"
import UpvoteButton from "./upvote-button"

const Playlists = ({ playlists }) => {
  const { colorMode } = useColorMode()

  return (
    <Stack width="100%" spacing="1px" my={4}>
      {playlists.map(playlist => (
        <PseudoBox
          key={playlist.uri}
          _first={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
          _last={{ borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }}
          bg={{ light: "gray.100", dark: "gray.700" }[colorMode]}
        >
          <Grid
            gridTemplateColumns="80px 1fr 80px"
            gridGap="3"
            p="3"
            width="100%"
          >
            <SpotifyEmbed title={playlist.title} spotifyUri={playlist.uri} />
            <Stack spacing="1" justify="center">
              <Box>
                <Heading
                  fontSize="xl"
                  as={GatsbyLink}
                  to={
                    playlist.gatsbyPath ??
                    `/playlists/${slugify(playlist.title, { lower: true })}`
                  }
                >
                  {playlist.title}
                </Heading>
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

export const PlaylistsPlaceholder = () => {
  const { colorMode } = useColorMode()

  return (
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
            bg={{ light: "gray.100", dark: "gray.700" }[colorMode]}
          />
        ))}
    </Stack>
  )
}
