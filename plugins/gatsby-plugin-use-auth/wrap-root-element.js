import React from "react"
import { navigate } from "gatsby"

import { AuthProvider } from "react-use-auth"

export const wrapRootElement = ({ element }) => {
  const callback_domain =
    typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.host}`
      : "http://localhost:8000"

  return (
    <AuthProvider
      navigate={navigate}
      auth0_domain="gillkyle.auth0.com"
      auth0_client_id="jnp9gQqg31Dcmr2iREXheChlk6g4BaHT" // okay to share publicly
      auth0_params={{
        redirectUri: callback_domain,
      }}
    >
      {element}
    </AuthProvider>
  )
}
