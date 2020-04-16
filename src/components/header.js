import React, { useEffect } from "react"
import { Link as GatsbyLink } from "gatsby"
import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/core"
import { useAuth } from "react-use-auth"

import Logo from "../img/logo.png"
import ClientOnly from "./client-only"

const Header = () => {
  const { login, logout, isAuthenticated, user, authResult } = useAuth()
  useEffect(() => {
    if (authResult) {
      localStorage.setItem("token", JSON.stringify(authResult.idToken))
      console.log(authResult.idToken)
    }
  }, [authResult])
  console.log({ user })
  console.log({ authResult })
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
          {isAuthenticated() ? (
            <Menu>
              <MenuButton as={Button} leftIcon="chevron-down">
                Profile
              </MenuButton>
              <MenuList placement="bottom-end">
                <MenuGroup title="Profile">
                  <MenuItem isDisabled>{user.email}</MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuGroup>
                <MenuGroup title="Help">
                  <MenuItem>
                    <a href="mailto:kyle.robert.gill@gmail.com">Contact Us</a>
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          ) : (
            <Button
              variant="solid"
              variantColor="blue"
              fontWeight="bold"
              onClick={() => login()}
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
