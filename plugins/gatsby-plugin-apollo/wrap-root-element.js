import React from "react"
import { ApolloProvider } from "@apollo/react-hooks"
import ApolloClient from "apollo-boost"
import fetch from "isomorphic-fetch"

const client = new ApolloClient({
  request: operation => {
    const isBrowser = typeof window !== "undefined"
    const token = isBrowser ? localStorage.getItem("token") : null
    console.log(token)
    operation.setContext({
      uri: "https://playlist-hunt.herokuapp.com/v1/graphql",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      fetch,
    })
  },
})

export const wrapRootElement = ({ element }) => {
  return <ApolloProvider client={client}>{element}</ApolloProvider>
}
