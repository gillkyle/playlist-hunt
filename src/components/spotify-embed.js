import React from "react"
import { Box } from "@chakra-ui/core"

const SpotifyEmbed = ({ wide = false, tall = false, title, spotifyUri }) => {
  return (
    <Box bg="gray.300" borderRadius={4} width={wide ? 260 : 80}>
      <iframe
        title={`Spotify playlist embed for ${title}`}
        src={`https://open.spotify.com/embed/playlist/${
          spotifyUri?.split(":")[2]
        }`}
        width={wide ? "260" : "80"}
        height={tall ? "360" : "80"}
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
        style={{ borderRadius: 4 }}
      ></iframe>
    </Box>
  )
}

export default SpotifyEmbed
