import React, { useState } from "react"
import { Stack, StatNumber, StatArrow, Button } from "@chakra-ui/core"

const UpvoteButton = ({ playlistId }) => {
  const [upvoted, setUpvoted] = useState(false)
  return (
    <Button
      height="100%"
      variant={upvoted ? "outline" : "solid"}
      variantColor="blue"
      onClick={() => setUpvoted(!upvoted)}
    >
      <Stack color={upvoted ? "blue.600" : "white"} align="center">
        <StatArrow
          color={upvoted ? "blue.600" : "white"}
          type="increase"
          m={0}
        ></StatArrow>
        <StatNumber fontSize="lg">0</StatNumber>
      </Stack>
    </Button>
  )
}

export default UpvoteButton
