import React, { useEffect } from "react"
import { useAuth } from "react-use-auth"
import { Heading, Text } from "@chakra-ui/core"

import Playlists from "../components/playlists"

export default () => {
  const { handleAuthentication } = useAuth()
  useEffect(() => {
    handleAuthentication()
  }, [])

  return (
    <React.Fragment>
      <Heading as="h1">Newest Playlists</Heading>
      <Text textAlign="center">
        The latest playlists from the community, coming in live.
      </Text>
      <Playlists playlists={undefined} />
    </React.Fragment>
  )
}
