/**
 * ============================================================================
 * Persisted navigation at the top of all pages for the layout component
 * ============================================================================
 */

import React from "react"
import { Link as GatsbyLink, navigate } from "gatsby"
import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/core"
import { useAuth0 } from "../../plugins/gatsby-plugin-auth0"

import Logo from "../img/logo.png"
import ClientOnly from "./client-only"

const Header = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()
  const { toggleColorMode } = useColorMode()

  return (
    <Flex align="center" justify="space-between" p="4">
      <Text
        fontWeight="bold"
        color="blue.600"
        fontSize="lg"
        letterSpacing={1.1}
      >
        <Image src={Logo} height={12} />
      </Text>
      <Stack isInline align="center" spacing="3">
        <Button variant="ghost" as={GatsbyLink} to="/">
          New
        </Button>
        <Button variant="ghost" as={GatsbyLink} to="/top">
          Top
        </Button>
        <ClientOnly>
          {isAuthenticated ? (
            <Menu>
              <MenuButton as={Button} leftIcon="chevron-down">
                Profile
              </MenuButton>
              <MenuList placement="bottom-end">
                <MenuItem isDisabled>{user?.email}</MenuItem>
                <MenuItem onClick={() => navigate(`/submit`)}>Submit</MenuItem>
                <MenuItem onClick={() => toggleColorMode()}>
                  Toggle Color Mode
                </MenuItem>
                <MenuItem>
                  <a href="mailto:kyle.robert.gill@gmail.com">Contact Us</a>
                </MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button
              variant="solid"
              variantColor="blue"
              fontWeight="bold"
              onClick={() => loginWithRedirect()}
            >
              Sign Up
            </Button>
          )}
        </ClientOnly>
      </Stack>
    </Flex>
  )
}

export default Header
