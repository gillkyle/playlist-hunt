import React from "react"
import { Box } from "@chakra-ui/react"

const SpotifyEmbed = ({ wide = false, tall = false, title, spotifyUri }) => {
  return (
    <Box
      bg="gray.300"
      borderRadius={4}
      height="80px"
      width={wide ? "260px" : "80px"}
    >
      <iframe
        title={`Spotify playlist embed for ${title}`}
        src={`https://open.spotify.com/embed/playlist/${
          spotifyUri?.split(":")[2]
        }`}
        width={wide ? "260px" : "80px"}
        height={tall ? "360px" : "80px"}
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
        style={{ borderRadius: 4 }}
      ></iframe>
    </Box>
  )
}

export default SpotifyEmbed
