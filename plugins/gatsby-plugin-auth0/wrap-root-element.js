import React from "react"
import { Auth0Provider } from "./auth"
import { navigate } from "gatsby"

const onRedirectCallback = appState => {
  navigate(appState)
}

export const wrapRootElement = ({ element }, pluginOptions) => {
  return (
    <Auth0Provider
      domain={pluginOptions.domain}
      client_id={pluginOptions.clientId}
      redirect_uri={
        typeof window !== `undefined` ? window.location.origin : null
      }
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
    >
      {element}
    </Auth0Provider>
  )
}
