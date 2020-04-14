import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Button, Flex, Stack, Text } from "@chakra-ui/core"

const Header = () => {
  return (
    <Flex align="center" justify="space-between" p="4">
      <Text fontWeight="bold" color="blue.600" fontSize="lg">
        Playlist · Hunt
      </Text>
      <Stack isInline align="center" spacing="3">
        <Button variant="ghost" as={GatsbyLink} to="/">
          New
        </Button>
        <Button variant="ghost" as={GatsbyLink} to="/top">
          Top
        </Button>
        <Button variant="solid" variantColor="blue" fontWeight="bold">
          Sign Up
        </Button>
      </Stack>
    </Flex>
  )
}

export default Header
