import React from "react"
import { Box, Flex, Grid, Heading, Stack, Text } from "@chakra-ui/core"
import Header from "./header"

const Layout = ({ title, subtitle, children }) => (
  <Grid gridTemplateRows="64px auto" minHeight="100vh">
    <Header />
    <Flex justify="center">
      <Stack p="4" align="center">
        <Heading as="h1">{title}</Heading>
        <Text textAlign="center">{subtitle}</Text>
        <Grid gridTemplateColumns="minmax(auto, 57ch)" paddingY="4">
          {children}
        </Grid>
      </Stack>
    </Flex>
  </Grid>
)

export default Layout
