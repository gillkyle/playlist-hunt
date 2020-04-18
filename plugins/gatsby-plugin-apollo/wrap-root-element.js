import React, { useState, useEffect } from "react"
import { ApolloProvider } from "@apollo/react-hooks"
import ApolloClient from "apollo-boost"
import fetch from "isomorphic-fetch"
import { useAuth0 } from "../gatsby-plugin-auth0"

const ApolloComponent = ({ element }) => {
  const { loading, getIdTokenClaims } = useAuth0()
  const [token, setToken] = useState()
  useEffect(() => {
    const getToken = async () => {
      if (!loading) {
        const idTokenClaims = await getIdTokenClaims()
        setToken(idTokenClaims?.__raw)
      }
    }

    getToken()
  })

  const client = new ApolloClient({
    request: operation => {
      const tokenHeader = { Authorization: `Bearer ${token}` }
      operation.setContext({
        uri: "https://playlist-hunt.herokuapp.com/v1/graphql",
        headers: {
          "content-type": "application/json",
          ...(token && tokenHeader),
        },
        fetch,
      })
    },
  })

  return <ApolloProvider client={client}>{element}</ApolloProvider>
}

export const wrapRootElement = ({ element }) => {
  return <ApolloComponent element={element} />
}
