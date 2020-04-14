import React from "react"

import { Heading, Text } from "@chakra-ui/core"
import Playlists from "../components/playlists"

export default () => (
  <React.Fragment>
    <Heading as="h1">Top Playlists</Heading>
    <Text textAlign="center">
      The best playlists ranked based on the historical number of upvotes from
      the community. Updated daily.
    </Text>
    <Playlists playlists={undefined} />
  </React.Fragment>
)
