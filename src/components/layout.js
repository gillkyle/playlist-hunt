/**
 * ============================================================================
 * Structures all content in vertically centered, header -> content -> footer
 * ============================================================================
 */

import React from "react"
import { Flex, Grid, Stack, Text } from "@chakra-ui/core"
import Header from "./header"

const Layout = ({ children }) => (
  <Grid gridTemplateRows="64px auto" minHeight="100vh">
    <Header />
    <Flex justify="center">
      <Grid gridTemplateColumns="minmax(auto, 64ch)" paddingY="4">
        <Stack p="4" align="center">
          {children}
        </Stack>
      </Grid>
    </Flex>
    <Flex as="footer" p="4" align="center" justify="center" color="gray.400">
      <Text fontSize="xs">© 2020 | PlaylistHunt, All Rights Reserved.</Text>
    </Flex>
  </Grid>
)

export default Layout
