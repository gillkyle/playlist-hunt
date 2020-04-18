import React, { useState } from "react"
import { Stack, StatNumber, StatArrow, Button } from "@chakra-ui/core"
import { useAuth0 } from "../../plugins/gatsby-plugin-auth0"

const UpvoteButton = ({ playlist }) => {
  const [upvoted, setUpvoted] = useState(false)
  const { loginWithRedirect, isAuthenticated } = useAuth0()
  console.log(playlist)
  return (
    <Button
      height="100%"
      variant={upvoted ? "outline" : "solid"}
      variantColor="blue"
      onClick={() => {
        if (isAuthenticated) {
          setUpvoted(!upvoted)
        } else {
          loginWithRedirect()
        }
      }}
    >
      <Stack color={upvoted ? "blue.600" : "white"} align="center">
        <StatArrow
          color={upvoted ? "blue.600" : "white"}
          type="increase"
          m={0}
        ></StatArrow>
        <StatNumber fontSize="lg">
          {playlist.upvotes_aggregate.aggregate.count}
        </StatNumber>
      </Stack>
    </Button>
  )
}

export default UpvoteButton
