import React, { useEffect } from "react"
import { useAuth } from "react-use-auth"

import Layout from "../components/layout"
import Playlists from "../components/playlists"

export default () => {
  const { handleAuthentication } = useAuth()
  useEffect(() => {
    handleAuthentication()
  }, [])

  return (
    <Layout
      title="Newest Playlists"
      subtitle="The latest playlists from the community, coming in live."
    >
      <Playlists playlists={undefined} />
    </Layout>
  )
}
